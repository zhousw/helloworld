import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImgUploadPage } from './img-upload';

@NgModule({
  declarations: [
    ImgUploadPage,
  ],
  imports: [
    IonicPageModule.forChild(ImgUploadPage),
  ],
})
export class ImgUploadPageModule {}
