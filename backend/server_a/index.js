const express = require('express');
const WebSocket = require('ws');
const { Kafka } = require('kafkajs');

const app = express();
const server = app.listen(3000,()=>{
    console.log('Server-a listening on port 3000');
});


const wss = new WebSocket.Server({server});

const kafka = new KafKa(
    {
        clientId: 'server-a',
        brokers: ['9092'], //my kakfa broker address, such as 9092
    }
)

const consumer = kafka.consumer({groupId: 'emote-group'});

async function run(){
    await consumer.connect();
    await consumer.subscribe({
        topic: 'aggregated-emote-data',
        fromBeginning: true,
    })

    await consumer.run({
        eachMessage: async ({topic, partition, message}) => {
            const emoteData = JSON.parse(message.value.toString());
            console.log('Received emoteData: ', emoteData);

            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN){
                    client.send(JSON.stringify(emoteData));
                }
            })
        }
    })
}

run().catch(console.error);
app.get('/',(req,res)=> {
    res.send('Server A says hello');
})