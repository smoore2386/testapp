import {
  Component,
  OnInit,
  Input,
  OnChanges,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  SimpleChanges
} from '@angular/core';
import { Device } from '../../model/device';

@Component({
  selector: 'app-device-table',
  templateUrl: './device-table.component.html',
  styleUrls: ['./device-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeviceTableComponent implements OnChanges {
  @Input() devices: Device[] = [];
  @Output() selectEmitter = new EventEmitter<Device>();
  @Output() fetchMore = new EventEmitter<boolean>();
  selectedDevice;
  totalDevices = 0;
  loading = true;

  constructor() {}
  /**
   * Handle row selection
   * @param event
   */
  onSelect(event) {
    this.selectEmitter.emit(this.selectedDevice);
  }

  /**
   * Fetch the next set of data on virtual scroll
   * @param event
   */
  loadMore(event) {
    console.log('event')
    this.loading = true;
    setTimeout(() => this.fetchMore.emit(true) , 3000 );

  }
  /**
   * Set loading to false when the devices array has changed.
   * @param changes changes in input()
   */
  ngOnChanges(changes: SimpleChanges) {
    // since the only input we have is devices we can deduce this here
    this.loading = false;
    this.totalDevices = this.devices.length;
  }
}
