import express from 'express';
import http from 'http';
import { initWebSocketServer } from './pushController';
import { handleDeviceUpdate, getAllDevices } from './deviceController';
import { simulateDeviceUpdates } from './deviceSimulator';

const app = express();

const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

// Initialize WebSocket server
initWebSocketServer(server);

// Middleware
app.use(express.json());

// API Routes
app.post('/api/devices/update', handleDeviceUpdate);

app.get('/api/devices', getAllDevices);

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
  // Start simulating devices (for demo purposes)
  simulateDeviceUpdates();
});