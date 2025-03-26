import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'server-a',
  brokers: ['localhost:9092']
});

export async function startKafkaConsumer(io) {
  const consumer = kafka.consumer({ groupId: 'server-a-group' });

  await consumer.connect();
  await consumer.subscribe({ topic: 'aggregated-emote-data', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const significantMoment = JSON.parse(message.value.toString());

      // Broadcast to WebSocket clients
      io.emit('significant-moment', significantMoment);
    },
  });

  console.log("Kafka consumer started...");
}

