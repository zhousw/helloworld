import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { XsClientPage } from './xs-client';

@NgModule({
  declarations: [
    XsClientPage,
  ],
  imports: [
    IonicPageModule.forChild(XsClientPage),
  ],
})
export class XsClientPageModule {}
