import { Request, Response } from 'express';
import { Device } from './types';
import { pushDeviceUpdate } from './pushController';

// In-memory store for devices (replace with DB in production)
const devices: Record<string, Device> = {};

// Handle device status updates
export const handleDeviceUpdate = (req: Request, res: Response) => {
  const update: Device = req.body;
  
  // Validate input
  if (!update.id || !update.status || typeof update.progress !== 'number') {
    res.status(400).json({ error: 'Invalid device data' });
  }
  
  // Update device status
  devices[update.id] = {
    ...(devices[update.id] || { name: `Device ${update.id}` }),
    ...update,
    timestamp: new Date()
  };
  
  // Push update to all connected clients
  pushDeviceUpdate(devices[update.id]);
  
  res.status(200).json({ success: true });
};

// Get all devices
export const getAllDevices = (req: Request, res: Response) => {
  console.log('Fetching all devices');
  res.status(200).json(devices);
};