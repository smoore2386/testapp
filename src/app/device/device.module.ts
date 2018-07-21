import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceEditorComponent } from './components/device-editor/device-editor.component';
import { DeviceTableComponent } from './components/device-table/device-table.component';
import { DevicePageComponent } from './device-page/device-page.component';
import {TableModule} from 'primeng/table';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromDevice from './state/device.reducer';
import { DeviceEffects } from './state/device.effects';

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    ReactiveFormsModule,
    StoreModule.forFeature('device', fromDevice.reducer),
    EffectsModule.forFeature([DeviceEffects]),
  ],
  declarations: [DeviceEditorComponent, DeviceTableComponent, DevicePageComponent],
  exports: [DevicePageComponent]
})
export class DeviceModule { }
