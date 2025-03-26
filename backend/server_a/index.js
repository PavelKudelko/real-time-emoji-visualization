import express from 'express';
import http from 'http';
import { setupWebSocket } from './websocket';
import { startKafkaConsumer } from './kafka';

const app = express();
const server = http.createServer(app);

// Setup WebSockets
const io = setupWebSocket(server);

// Start Kafka Consumer and Handle Errors
(async () => {
    try {
        await startKafkaConsumer(io);
        console.log('Kafka consumer started successfully');
    } catch (error) {
        console.error('Error starting Kafka consumer:', error);
    }
})();

app.get('/api/significant-moments', (req, res) => {
    res.json({ message: 'Significant moments endpoint' });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server A running on port ${PORT}`);
});
