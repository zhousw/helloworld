import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PwdPage } from './pwd';

@NgModule({
  declarations: [
    PwdPage,
  ],
  imports: [
    IonicPageModule.forChild(PwdPage),
  ],
})
export class PwdPageModule {}
