import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvoiceZfPage } from './invoice-zf';

@NgModule({
  declarations: [
    InvoiceZfPage,
  ],
  imports: [
    IonicPageModule.forChild(InvoiceZfPage),
  ],
})
export class InvoiceZfPageModule {}
