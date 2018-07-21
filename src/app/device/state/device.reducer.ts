import { Action, createSelector } from '@ngrx/store';
import { DeviceActions, DeviceActionTypes } from './device.actions';
import { Device } from '../model/device';

/**
 * Keep track of devices and the last key for pagination
 */
export interface DeviceState {
  devices: Device[];
  lastKey: number;
}

export const initialState: DeviceState = {
  devices: [],
  lastKey: 0
};

/**
 * Reduce device state
 * @param state current device state
 * @param action state actions
 */
export function reducer(state = initialState, action: DeviceActions): DeviceState {
  switch (action.type) {

    case DeviceActionTypes.LoadNDevices:
      return state;

    case DeviceActionTypes.LoadSuccess:
      return { ...state, devices: state.devices.concat(action.payload.slice()) };

    case DeviceActionTypes.RemoveDevice:
      const idx = state.devices.indexOf(action.payload);
      console.log(idx);
      return {
        ...state,
        devices: [...state.devices.slice(0, idx), ...state.devices.slice(idx + 1)]
      };

    case DeviceActionTypes.UpdateDevice:
      return {
        ...state,
        devices: state.devices.map((device, index) => {
          if (index === action.payload.id) {
            return { ...action.payload };
          }
          return device;
        })
      };

    default:
      return state;
  }
}

export const deviceState = (state) => state.devices;
// for later selectors using createSelector
