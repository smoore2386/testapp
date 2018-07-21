import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  OnChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { Device } from '../../../model/device';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-device-editor',
  templateUrl: './device-editor.component.html',
  styleUrls: ['./device-editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeviceEditorComponent implements OnChanges {
  @Input() device: Device;
  @Input() addDevice = false;
  @Output() updateEmitter = new EventEmitter<Device>();
  @Output() removeEmitter = new EventEmitter<Device>();
  @Output() addEmitter = new EventEmitter<Device>();

  hasDevice = false;
  form;

  constructor(private builder: FormBuilder) {}
  /**
   * Create a generic form with validators for the app
   * @param device device to create form with
   */
  initializeForm(device: Device) {
    this.hasDevice = true;
    this.form = this.builder.group({
      name: [device.name, Validators.required],
      hostname: [
        device.hostname,
        [
          Validators.required,
          Validators.pattern(
            /^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/
          )
        ]
      ],
      username: [device.username, Validators.required],
      port: [
        device.port,
        [Validators.required, Validators.min(0), Validators.max(65535)]
      ],
      id: [device.id]
    });
  }
  /**
   * Tell parent component to add this
   * @param id
   */
  add() {
    console.log(this.form.value);
    this.addEmitter.emit(this.form.value)
  }

  /**
   * Tell parent component to remove this
   * @param id
   */
  remove() {
    this.hasDevice = false;
    this.removeEmitter.emit(this.device);
  }

  /**
   * Tell parent component to update this
   */
  update() {
    this.updateEmitter.emit(this.form.value);
  }

  /**
   * The only change that should be pushed is device so no need for SimpleChanges
   */
  ngOnChanges() {
    if (this.device) {
      this.initializeForm(this.device);
    }else if(this.addDevice){
      this.initializeForm({hostname:'', username: '', name: '', port: ''})
    }
  }
}
