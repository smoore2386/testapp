import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import {
  DeviceActions,
  DeviceActionTypes,
  LoadSuccess,
  LoadFailure,
  LoadNDevices,
  RemoveDevice,
  RemoveSuccess,
  UpdateDevice,
  AddDevice
} from './device.actions';
import { DeviceService } from '../services/device.service';
import { switchMap, map, catchError, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import { Device } from '../model/device';

@Injectable()
export class DeviceEffects {
  /**
   * load specific number of devices
   */
  @Effect()
  loadDevices$ = this.actions$.ofType(DeviceActionTypes.LoadNDevices).pipe(
    switchMap((action: LoadNDevices) =>
      this.deviceService.fetch(action.payload.limit)
    ),
    map((devices: Device[]) => new LoadSuccess(devices)),
    catchError(err => of(new LoadFailure(err)))
  );

  /**
   * Remove device from firebase
   * @effect
   */
  @Effect()
  removeDevice$ = this.actions$.ofType(DeviceActionTypes.RemoveDevice).pipe(
    map((action: RemoveDevice) => this.deviceService.remove(action.payload.id)),
    map(() => new RemoveSuccess()),
    catchError(err => of(new LoadFailure(err)))
  );

  /**
   * Update firebase for device
   * @effect
   */
  @Effect()
  updateDevice$ = this.actions$.ofType(DeviceActionTypes.UpdateDevice).pipe(
    tap(t => console.log(t)),
    map((action: UpdateDevice) => this.deviceService.update(action.payload)),
    filter(() => false),
    catchError(err => of(new LoadFailure(err)))
  );


  /**
   * Update firebase for device
   * @effect
   */
  @Effect()
  addDevice$ = this.actions$.ofType(DeviceActionTypes.AddDevice).pipe(
    tap(t => console.log(t)),
    map((action: AddDevice) => this.deviceService.create(action.payload)),
    filter(() => false),
    catchError(err => of(new LoadFailure(err)))
  );
  constructor(
    private actions$: Actions,
    private deviceService: DeviceService
  ) {}
}
