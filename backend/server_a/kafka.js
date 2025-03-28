import { Kafka } from 'kafkajs';


const kafka = new Kafka({
  clientId: 'server-a',
  brokers: ['kafka:9092'],
  connectionTimeout: 10000,
  requestTimeout: 10000,
  retry: {
    initialRetryTime: 1000,
    retries: 5
  }
});

/*
async function waitForGroupCoordinator(retries = 10, delay = 5000 ){
  const admin = kafka.admin();
  await admin.connect();
  for (let i = 0; i < retries; i++) {
    try {
      const groupDescription = await admin.describeGroups(["server-a-group"]);
      const groupState = groupDescription.groups[0]?.state;

      console.log(`Kafka Consumer Group State: ${groupState}`);

      if (groupState === "Stable") {
        console.log("Kafka Group Coordinator is ready!");
        await admin.disconnect();
        return;
      }
    } catch (error) {
      console.error(`Failed to get group state (attempt ${i + 1}/${retries}):`, error);
    }

    await setTimeout(delay);
  }

  console.error("Group Coordinator did not become ready in time.");
  await admin.disconnect();
  throw new Error("Kafka Group Coordinator not ready");

}*/

export async function startKafkaConsumer(io) {
  /*adding admin but i dont know*/
  //const admin = kafka.admin();
  try {
    /* Create topics before consumer setup
    await admin.connect();
    console.log('Connected to Kafka admin client');

    await admin.createTopics({
      topics: [
        { topic: 'aggregated-emote-data', numPartitions: 1, replicationFactor: 1 },
        { topic: 'raw-emote-data', numPartitions: 1 ,replicationFactor: 1 }
      ]
    });
    console.log('Topics created successfully');

    // Disconnect admin after topic creation
    await admin.disconnect();*/

    // 4️⃣ 🛠 wait for Group Coordinator to be okay
    //await waitForGroupCoordinator();  // 👈 在这里等待


  const consumer = kafka.consumer({
    groupId: 'server-a-group' ,
    retry: {
      retries: 5,
      initialRetryTime: 1000,
      maxRetryTime: 5000
    }});

  await consumer.connect();
  await consumer.subscribe({ topic: 'aggregated-emote-data', fromBeginning: true });
  await consumer.subscribe({topic: 'raw-emote-data', fromBeginning: true});
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {

      try{

        if (topic === 'aggregated-emote-data') {
          const significantMoment = JSON.parse(message.value.toString());
          console.log('servera' + JSON.stringify(significantMoment));
          // Broadcast to WebSocket clients
          // significant-moment is similar to aggregatedData
          io.emit('significant-moment', {
            emote:significantMoment.emote,
            timestamp: significantMoment.timestamp
          });

        } else if (topic === 'raw-emote-data') {
          const currentMoment = JSON.parse(message.value.toString());
          console.log('servera' + JSON.stringify(currentMoment));
          io.emit('current-moment', {
            emote:currentMoment.emote,
            timestamp: currentMoment.timestamp

          });
        }
      } catch (error) {
        console.log('Error processing message', message);
      }
    },
  });

  console.log("Kafka consumer started...");
} catch (error) {
    console.error('Kafka initialization error:', error);
    throw error;
  }
}
