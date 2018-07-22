import { Component, OnInit, ChangeDetectionStrategy, OnChanges, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { BehaviorSubject, Observable } from 'rxjs';
import { Device } from '../model/device';
import { LoadNDevices, RemoveDevice, UpdateDevice, AddDevice } from '../state/device.actions';

/**
 * Intended to be the smart component for the devices page
 */
@Component({
  selector: 'app-device-page',
  templateUrl: './device-page.component.html',
  styleUrls: ['./device-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DevicePageComponent implements OnInit {

  devices$: Observable<Device[]>;
  selectedDevice: BehaviorSubject<Device> = new BehaviorSubject(null);
  add = false;

  constructor(private store: Store<AppState> ) {
    this.devices$ = this.store.select('device');
  }
  /**
   * Empty device to child component
   */
  addDeviceEditor(){
    this.add = true;
    this.selectedDevice.next({hostname:'', username: '', name: '', port: ''});
  }
  /**
   * Close the device editor
   */
  closeEditor(){
    this.add = false;
    this.selectedDevice.next(null);
  }
  /**
   * Set the subject
   * @param device device chosen
   */
  handleSelection(device: Device){
    this.add = false;
    this.selectedDevice.next(device);
  }

  /**
   * Dispatch action to add device
   * @param device adding device
   */
  addDevice(device) {
    this.store.dispatch(new AddDevice(device));
    this.add = false;
  }

  /**
   * Dispatch to store to remove device
   * @param device device to be removed
   */
  removeDevice(device) {
    this.store.dispatch(new RemoveDevice(device));
    this.selectedDevice.next(null);
  }

  /**
   * Update this device
   * @param device device to be updated
   */
  updateDevice(device){
    this.store.dispatch(new UpdateDevice(device));
  }

  /**
   * Fetch initial or more from firebase
   */
  dispatchFetch(){
    this.store.dispatch(new LoadNDevices({limit: 25}));
  }

  /**
   * Lifecycle hook when component inits fetch
   */
  ngOnInit() {
    this.dispatchFetch();
  }

}
