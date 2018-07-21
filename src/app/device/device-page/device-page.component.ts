import { Component, OnInit, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { BehaviorSubject } from 'rxjs';
import { Device } from '../../model/device';
import { LoadDevices } from '../../device.actions';

@Component({
  selector: 'app-device-page',
  templateUrl: './device-page.component.html',
  styleUrls: ['./device-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevicePageComponent implements OnInit {

  devices: BehaviorSubject<Device[]>;
  selectedDevice;

  constructor(private store: Store<AppState> ) {

  }

  ngOnInit() {
    this.store.dispatch(new LoadDevices());
  }

}
