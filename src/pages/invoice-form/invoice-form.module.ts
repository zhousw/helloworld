import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvoiceFormPage } from './invoice-form';

@NgModule({
  declarations: [
    InvoiceFormPage,
  ],
  imports: [
    IonicPageModule.forChild(InvoiceFormPage),
  ],
})
export class InvoiceFormPageModule {}
