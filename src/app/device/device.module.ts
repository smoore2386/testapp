import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceEditorComponent } from './components/device-editor/device-editor.component';
import { DeviceTableComponent } from './components/device-table/device-table.component';
import { DevicePageComponent } from './device-page/device-page.component';
import {TableModule} from 'primeng/table';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    ReactiveFormsModule
  ],
  declarations: [DeviceEditorComponent, DeviceTableComponent, DevicePageComponent],
  exports: [DevicePageComponent]
})
export class DeviceModule { }
