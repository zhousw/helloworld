import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientFormPage } from './client-form';

@NgModule({
  declarations: [
    ClientFormPage,
  ],
  imports: [
    IonicPageModule.forChild(ClientFormPage),
  ],
})
export class ClientFormPageModule {}
