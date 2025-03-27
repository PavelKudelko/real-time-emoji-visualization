const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'emotegenerator',
    brokers: [ process.env.KAFKA_BROKER || 'kafka:9092']
});

const admin = kafka.admin();
const producer = kafka.producer({
    createPartitioner: require('kafkajs').Partitioners.LegacyPartitioner
});

const emotes = ['❤️', '👍', '😢', '😡'];
const topics = ['raw-emote-data', 'aggregated-emote-data'];

const createTopics = async () => {
    try {
        await admin.connect();

        // List existing topics
        const existingTopics = await admin.listTopics();

        // Filter topics that need to be created
        const topicsToCreate = topics.filter(topic =>
            !existingTopics.includes(topic)
        );

        // Create only missing topics
        if (topicsToCreate.length > 0) {
            await admin.createTopics({
                topics: topicsToCreate.map(topic => ({
                    topic,
                    numPartitions: 1,
                    replicationFactor: 1
                }))
            });
            console.log('Topics created:', topicsToCreate);
        } else {
            console.log('All topics already exist');
        }
    } catch (error) {
        console.error('Topic creation error:', error);
    } finally {
        await admin.disconnect();
    }
};

const getRandomEmote = async () => {
    const emote = emotes[Math.floor(Math.random() * emotes.length)];
    const timestamp = new Date().toISOString();
    return { emote, timestamp };
}

const sendMessage = async (message) => {
    await producer.send({
        topic: 'raw-emote-data',
        messages: [{ value: JSON.stringify(message) }]
    });

    console.log('Message sent: ', message);
}

const generateEmotes = async () => {
    await createTopics();
    await producer.connect();
    setInterval(async () => {
        if(Math.random() < 0.2) {
            const burstEmote = emotes[Math.floor(Math.random() * emotes.length)];
            for(let i = 0; i < Math.floor(Math.random() * 51) + 50; i++) {
                const message = { emote: burstEmote, timestamp: new Date().toISOString() };
                await sendMessage(message);
            }
        } else {
            for(let i = 0; i < Math.floor(Math.random() * 16) + 5; i++) {
                const message = await getRandomEmote();
                await sendMessage(message);
            }
        }
    }, 1000);
};

generateEmotes().catch(console.error);