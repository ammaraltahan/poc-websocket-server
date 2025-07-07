import { WebSocket, WebSocketServer } from 'ws';
import { Device } from './types';

// Store connected WebSocket clients
const clients: Set<WebSocket> = new Set();

// Initialize WebSocket server
let wss: WebSocketServer;

export function initWebSocketServer(server: any) {
  wss = new WebSocketServer({ server });
  
  wss.on('connection', (ws) => {
    clients.add(ws);
    console.log(`New client connected. Total: ${clients.size}`);
    
    ws.on('close', () => {
      clients.delete(ws);
      console.log(`Client disconnected. Total: ${clients.size}`);
    });
  });
}

// Push device update to all connected clients
export function pushDeviceUpdate(device: Device) {
  const message = JSON.stringify({
    type: 'deviceUpdate',
    data: device
  });
  
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}