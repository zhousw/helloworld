import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvoicedelServiceInfoPage } from './invoicedel-service-info';

@NgModule({
  declarations: [
    InvoicedelServiceInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(InvoicedelServiceInfoPage),
  ],
})
export class InvoicedelServiceInfoPageModule {}
