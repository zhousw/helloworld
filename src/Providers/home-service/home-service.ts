import { Injectable } from '@angular/core';
import { HttpService } from "../HttpService";
import { AppConfig } from '../../app/app.config';
//import { AppUtil } from "../../app/app.util";

@Injectable()
export class HomeServiceProvider {

  constructor(public httpService: HttpService) {
    console.log('Hello HomeServiceProvider Provider');
  }

   //消息
   getMessageInfo(phone?,pwd?){
      return this.httpService.HttpPost(AppConfig.urlRoot + 'wXKPInvoiceAction!getMessageInfo.shtml')
  }
}
