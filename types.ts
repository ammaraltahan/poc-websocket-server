export type DeviceStatus = 'connected' | 'disconnected' | 'error';

export interface Device {
  id: string;
  name?: string;
  status: DeviceStatus;
  progress: number;
  timestamp?: Date;
}