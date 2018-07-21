import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { SmartOneComponent } from './components/smart-one/smart-one.component';
import { DumbOneComponent } from './components/dumb-one/dumb-one.component';

import {AngularFireModule} from 'angularfire2';
import * as fromDevice from './device.reducer';
import { DeviceEffects } from './device.effects';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { DeviceModule } from './device/device.module';

const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyAv2mHMUxIDBKHAMN7EmS3POUfEMaKb9s0',
  authDomain: 'shanetest-c06b0.firebaseapp.com',
  databaseURL: 'https://shanetest-c06b0.firebaseio.com',
  projectId: 'shanetest-c06b0',
  storageBucket: 'shanetest-c06b0.appspot.com',
  messagingSenderId: '232886098017'
};


@NgModule({
  declarations: [
    AppComponent,
    SmartOneComponent,
    DumbOneComponent
  ],
  imports: [
    BrowserModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG, 'shanetest'),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects]),
    StoreModule.forFeature('device', fromDevice.reducer),
    EffectsModule.forFeature([DeviceEffects]),
    DeviceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
