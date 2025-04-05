const { Kafka } = require('kafkajs');
const { getSettings } = require('../config/settings');

// kafka instance
const kafka = new Kafka({
  clientId: 'server-b',
  brokers: ['kafka:9092'],
  connectionTimeout: 10000,
  requestTimeout: 10000,
  retry: {
    initialRetryTime: 1000,
    retries: 5
  }
});

// empty message buffer
let messageBuffer = [];

// Initialise consumer
const consumer = kafka.consumer({ groupId: 'emote-analysis-group'});
// Initialise producer for sending significant moments
const producer = kafka.producer();

const analyzeEmotes = async (emoteData, threshold, allowedEmotes) => {
    // filter unallowed emotes
    const filteredData = emoteData.filter(record =>
        allowedEmotes.includes(record.emote)
    );

    const significantMoments = [];
    const emoteCounts = {};

    filteredData.forEach(record => {
        const timestamp = record.timestamp.slice(0, 16); // Minute-level granularity
        const emote = record.emote;

        if (!emoteCounts[timestamp]) {
            emoteCounts[timestamp] = { total: 0 };
        }

        if (!emoteCounts[timestamp][emote]) {
            emoteCounts[timestamp][emote] = 0;
        }

        emoteCounts[timestamp][emote]++;
        emoteCounts[timestamp].total++;
    });

    // find significant moment with threshold
    for (const timestamp in emoteCounts) {
        const counts = emoteCounts[timestamp];
        const totalEmotes = counts.total;
        for (const emote in counts) {
            if (emote !== 'total') {
                const ratio = counts[emote] / totalEmotes;
                if (ratio > threshold) {
                    significantMoments.push({
                    timestamp,
                    emote,
                    count: counts[emote],
                    totalEmotes,
                    ratio: parseFloat(ratio.toFixed(4)),
                    isSignificant: true
                    });
                }
            }
        }
    }

    return significantMoments;
}


const processBatch = async (messages) => {

    try {
        // Get current settings
        const settings = getSettings();
        const threshold = settings.threshold;
        const allowedEmotes = settings.allowedEmotes;

        // debug
        if (!threshold || !allowedEmotes) {
        console.error('Missing required settings: threshold or allowedEmotes');
        return [];
        }

        // Parse messages into emote data
        const emoteData = messages.map(message => {
        try {
            return JSON.parse(message.value.toString());
        } catch (err) {
            console.error('Error parsing message:', err);
            return null;
        }
        }).filter(Boolean); // Remove any null entries from parsing errors

        const results = await analyzeEmotes(emoteData, threshold, allowedEmotes);

        // log for debug
        console.log(`Analyzed ${emoteData.length} messages, found ${results.length} significant moments`);

        return results;
    } catch (error) {
        console.error('Error processing batch:', error);
        return [];
    }
};

const sendToAggregatedTopic = async (significantMoments) => {
    if (!significantMoments.length) return;
    try {
        await producer.connect();
        // Create a message for the significant moment
        const messages = significantMoments.map(moment => ({
        key: `${moment.timestamp}-${moment.emote}`,
        value: JSON.stringify({
            timestamp: moment.timestamp,
            emote: moment.emote,
            count: moment.count,
            totalEmotes: moment.totalEmotes,
            // these are not needed I think ==> remove for now
            // ratio: moment.ratio,
            // isSignificant: true
        })
        }));

        // send to the aggregated-emote-data topic
        await producer.send({
            topic: 'aggregated-emote-data',
            messages
        });
        // for debug
        //console.log(`serverbbb significant ${messages.emote} ${messages.timestamp}`);
        messages.forEach((msg) => {
            const data = JSON.parse(msg.value);
            console.log(`serverbbb significant ${data.emote} ${data.timestamp}`);
        });
        console.log(`Sent ${messages.length} significant moments to aggregated-emote-data topic`);
    } catch (error) {
        console.error('Error sending to aggregated-emote-data topic:', error);
    }
};

const processMessageBuffer = async () => {
    if (messageBuffer.length === 0) return;

    const settings = getSettings();
    const batchToProcess = [...messageBuffer]; // Create a copy of the buffer
    messageBuffer = [];

    console.log(`Processing batch of ${batchToProcess.length} messages`);
    const significantMoments = await processBatch(batchToProcess);

    if (significantMoments.length > 0) {
        await sendToAggregatedTopic(significantMoments);
    }
};

const startConsumer = async () => {
    try {
        console.log('Starting Kafka consumer...');
        await consumer.connect();
        await producer.connect();

        // Subscribe to the emotes topic
        await consumer.subscribe({ topic: 'raw-emote-data', fromBeginning: true });
        console.log("Kafka consumer started and subscribed to topics");

        // Process messages
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                try {
                    messageBuffer.push(message);

                    const { interval } = getSettings();

                    // process batch when buffer reaches the interval
                    if (messageBuffer.length >= interval) {
                        await processMessageBuffer();
                    }
                } catch (error) {
                    console.error('Error handling message:', error);
                }
            },
        });

        // set up periodic processing to handle cases where messages come in slowly
        // and the buffer doesn't fill up to interval size
        const bufferCheckInterval = setInterval(async () => {
            if (messageBuffer.length > 0) {
                await processMessageBuffer();
            }
        }, 30000); // Check every 30 seconds

        consumer.bufferCheckInterval = bufferCheckInterval;

    } catch (error) {
        console.error('Error in Kafka consumer:', error);
        // Try to disconnect
        try {
            await consumer.disconnect();
            await producer.disconnect();
            if (consumer.bufferCheckInterval) {
                clearInterval(consumer.bufferCheckInterval);
            }
        }
        catch (err) {
            console.error('Error disconnecting:', err);
        }
        // Try to reconnect after delay
        setTimeout(() => startConsumer(), 5000);
    }
};

const stopConsumer = async () => {
    try {
        if (consumer.bufferCheckInterval) {
            clearInterval(consumer.bufferCheckInterval);
        }
        if (messageBuffer.length > 0) {
            await processMessageBuffer();
        }
        await consumer.disconnect();
        await producer.disconnect();
        console.log('Kafka consumer stopped');
    } catch (error) {
        console.error('Error stopping Kafka consumer:', error);
    }
};

module.exports = {
    startConsumer,
    stopConsumer,
    analyzeEmotes,
    processBatch
};

