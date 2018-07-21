import { Action } from '@ngrx/store';
import { Device } from './model/device';

export enum DeviceActionTypes {
  LoadNDevices = '[Device] Load N Devices',
  AddDevice = '[Device] Add Device',
  RemoveDevice = '[Device] Remove Device',
  UpdateDevice = '[Device] Update Device',
  LoadSuccess = '[Device] Load Success',
  LoadFailure = '[Device] Load Failure',
  RemoveSuccess = '[Device] Remove Success'

}

export class LoadNDevices implements Action {
  readonly type = DeviceActionTypes.LoadNDevices;
  constructor(public payload: { limit: number }) { }
}

export class LoadSuccess implements Action {
  readonly type = DeviceActionTypes.LoadSuccess;
  constructor(public payload: Device[]) { }
}

export class LoadFailure implements Action {
  readonly type = DeviceActionTypes.LoadFailure;
  constructor(public payload: { error: string }) { }
}

export class AddDevice implements Action {
  readonly type = DeviceActionTypes.AddDevice;
  constructor(public payload: Device) { }
}

export class RemoveDevice implements Action {
  readonly type = DeviceActionTypes.RemoveDevice;
  constructor(public payload: Device) { }
}
export class RemoveSuccess implements Action {
  readonly type = DeviceActionTypes.RemoveSuccess;
}

export class UpdateDevice implements Action {
  readonly type = DeviceActionTypes.UpdateDevice;
  constructor(public payload: Device) { }
}
export type DeviceActions = LoadNDevices | AddDevice | RemoveDevice | UpdateDevice | LoadSuccess | LoadFailure | RemoveSuccess;
