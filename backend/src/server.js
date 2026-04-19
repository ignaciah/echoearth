```javascript
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

app.use(cors());
app.use(express.json());

let totalActions = 0;
let activeUsers = 0;

io.on('connection', (socket) => {
  activeUsers++;
  io.emit('actionCount', totalActions);
  console.log(`🌍 Planetary helper connected. Active: ${activeUsers}`);
  
  socket.on('helpAction', (data) => {
    totalActions++;
    io.emit('actionCount', totalActions);
    io.emit('newAction', { ...data, total: totalActions });
    console.log(`✨ Help action #${totalActions} for hotspot ${data.hotspotId}`);
  });
  
  socket.on('disconnect', () => {
    activeUsers--;
    console.log(`👋 Helper left. Active: ${activeUsers}`);
  });
});

// API endpoint for hotspots data
app.get('/api/hotspots', (req, res) => {
  // In hackathon, return mock data
  // In production, fetch from OpenAQ + USGS + Open-Meteo
  res.json([
    { id: 1, city: 'Delhi', lat: 28.6139, lon: 77.2090, issue: 'Air Quality', intensity: 0.85 },
    { id: 2, city: 'Los Angeles', lat: 34.0522, lon: -118.2437, issue: 'Heatwave', intensity: 0.72 }
  ]);
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 EchoEarth backend running on port ${PORT}`);
});
