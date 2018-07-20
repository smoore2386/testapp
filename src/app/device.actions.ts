import { Action } from '@ngrx/store';
import { Device } from './model/device';

export enum DeviceActionTypes {
  LoadDevices = '[Device] Load Devices',
  AddDevice = '[Device] Add Device',
  RemoveDevice = '[Device] Add Device',
}

export class LoadDevices implements Action {
  readonly type = DeviceActionTypes.LoadDevices;
}

export class AddDevice implements Action {
  readonly type = DeviceActionTypes.AddDevice;
  constructor(payload: Device) { }
}

export class RemoveDevice implements Action {
  readonly type = DeviceActionTypes.RemoveDevice;
  constructor(payload: Device) { }
}

export type DeviceActions = LoadDevices | AddDevice | RemoveDevice;
