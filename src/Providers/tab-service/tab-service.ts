import { Injectable } from '@angular/core';
import { HttpService } from "../HttpService";
import { AppConfig } from '../../app/app.config';

@Injectable()
export class TabServiceProvider {

  constructor(
    private httpService:HttpService
  ) {
    console.log('Hello TabServiceProvider Provider');
  }

  outLogin (){
    return this.httpService.HttpPost(AppConfig.urlRoot + 'wXKPLoginAction!logout.shtml')
  }

}
