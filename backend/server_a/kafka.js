import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'server-a',
  brokers: ['kafka:9092']
});

export async function startKafkaConsumer(io) {
  const consumer = kafka.consumer({ groupId: 'server-a-group' });

  await consumer.connect();
  await consumer.subscribe({ topic: 'aggregated-emote-data', fromBeginning: true });
  await consumer.subscribe({topic: 'raw-emote-data', fromBeginning: true});
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {

      try{

        if (topic === 'aggregated-emote-data') {
          const significantMoment = JSON.parse(message.value.toString());
          // Broadcast to WebSocket clients
          // significant-moment is similar to aggregatedData
          io.emit('significant-moment', {
            emote:significantMoment.emote,
            timestamp: significantMoment.timestamp,
            viewerCount: significantMoment.count
          });

        } else if (topic === 'raw-emote-data') {
          const currentMoment = JSON.parse(message.value.toString());
          io.emit('current-moment', {
            emote:currentMoment.emote,
            timestamp: currentMoment.timestamp,
            viewerCount: currentMoment.viewerCount

          })
        }



      } catch (error) {
        console.log('Error processing message', message);
      }

    },
  });

  console.log("Kafka consumer started...");
}

