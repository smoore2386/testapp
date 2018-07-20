import { Action } from '@ngrx/store';
import { DeviceActions, DeviceActionTypes } from './device.actions';

export interface State {

}

export const initialState: State = {

};

export function reducer(state = initialState, action: DeviceActions): State {
  switch (action.type) {

    case DeviceActionTypes.LoadDevices:
      return state;


    default:
      return state;
  }
}
