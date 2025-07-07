import { Device } from './types';
import { pushDeviceUpdate } from './pushController';

// In-memory device states
const simulatedDevices: Record<string, Device> = {
  'device-1': { id: 'device-1', name: 'Thermostat', status: 'connected', progress: 30 },
  'device-2': { id: 'device-2', name: 'Security Camera', status: 'disconnected', progress: 0 },
  'device-3': { id: 'device-3', name: 'Smart Lock', status: 'connected', progress: 75 }
};

export function simulateDeviceUpdates() {
  // Simulate periodic device updates
  setInterval(() => {
    Object.keys(simulatedDevices).forEach(id => {
      const device = simulatedDevices[id];
      
      // Random status changes
      if (Math.random() > 0.8) {
        device.status = device.status === 'connected' ? 'disconnected' : 'connected';
      }
      
      // Progress updates
      if (device.status === 'connected') {
        device.progress = Math.min(100, device.progress + (Math.random() * 10));
        if (device.progress >= 100) device.progress = 0;
      }
      
      device.timestamp = new Date();
      
      // Push update to clients
      pushDeviceUpdate(device);
    });
  }, 3000); // Update every 3 seconds
}