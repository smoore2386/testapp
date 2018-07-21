import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Device } from '../model/device';
import { map, tap, take } from 'rxjs/operators';
import { AppState } from '../../reducers';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  lastKey: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(
    private afDb: AngularFireDatabase,
    private store: Store<AppState>
  ) { }

  /**
   * Create device
   * @param device device to create
   */
  create(device: Device) {
    this.afDb.list('/download/request/configurations/', ref => ref.limitToLast(1))
      .snapshotChanges()
      .pipe(
        take(1),
        tap(act => console.log(act)),
        map(actions => actions.map(action => action.payload.key)),
        map(lastId => {
          console.log('lastId', lastId)
          const newId = (Number(lastId[0]) + 1).toString();
          this.afDb.object(`/download/request/configurations/${newId}`).update(device)
        })
      ).subscribe();

  }

  /**
   * Remove a selected device depending on array index
   * @param deviceId id of the device to remove
   */
  remove(deviceId) {
    this.afDb.object(`/download/request/configurations/${deviceId}`).remove();
  }

  /**
   *  Update a selected device
   * @param device
   */
  update(device: Device) {
    if (device.id) {
      this.afDb
        .object(`/download/request/configurations/${device.id}`)
        .update(device);
    }
  }

  /**
   * fetch simple array list from firebase
   * @param limit size of fetch
   */
  fetch(limit = 25) {
    return this.afDb
      .list('/download/request/configurations/', ref =>
        ref
          .orderByKey()
          .startAt(this.lastKey.getValue().toString())
          .endAt((this.lastKey.getValue() + limit).toString())
      )
      .snapshotChanges()
      .pipe(
        // set last key
        map(actions => {
          this.lastKey.next(this.lastKey.getValue() + actions.length + 1);
          return actions.map(action => {
            const id = action.payload.key;
            const dev: Device = action.payload.val() as Device;
            dev.id = id;
            return dev;
          });
        })
      );
  }
}
