import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvoiceCkPage } from './invoice-ck';

@NgModule({
  declarations: [
    InvoiceCkPage,
  ],
  imports: [
    IonicPageModule.forChild(InvoiceCkPage),
  ],
})
export class InvoiceCkPageModule {}
