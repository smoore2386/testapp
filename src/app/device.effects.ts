import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { DeviceActions, DeviceActionTypes } from './device.actions';

@Injectable()
export class DeviceEffects {

  @Effect()
  effect$ = this.actions$.ofType(DeviceActionTypes.LoadDevices);

  constructor(private actions$: Actions) {}
}
