import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FastMailPage } from './fast-mail';

@NgModule({
  declarations: [
    FastMailPage,
  ],
  imports: [
    IonicPageModule.forChild(FastMailPage),
  ],
})
export class FastMailPageModule {}
