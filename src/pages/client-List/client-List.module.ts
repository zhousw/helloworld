import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientListPage } from '../client-List/client-List';

@NgModule({
  declarations: [
    ClientListPage,
  ],
  imports: [
    IonicPageModule.forChild(ClientListPage),
  ],
})
export class ClientListPageModule {}
