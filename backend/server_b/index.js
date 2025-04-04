
const express = require('express');
// logging library for debug
const morgan = require('morgan');
const settingsRoutes = require('./routes/settingsRoutes');

const PORT = 3001;

const http = require('http');
const app = express();

const server = http.createServer(app);

app.use(express.json());
app.use(morgan('dev'));

const runServer = async() => {
  server.listen(PORT, () => {
    console.log(`server-b listening on port ${PORT}`);
  });
};

runServer();

app.use('/settings', settingsRoutes);

// Catch all route for undefined routes
app.use((req, res) => {
  res.status(404).json({status: 404, message: 'Route not found'});
});