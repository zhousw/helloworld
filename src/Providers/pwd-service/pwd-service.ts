import { Injectable } from '@angular/core';
import { HttpService } from "../HttpService";
import { AppConfig } from '../../app/app.config';
@Injectable()
export class PwdServiceProvider {

  constructor(
    private httpService:HttpService
  ) {
    console.log('Hello PwdServiceProvider Provider');
  }

  alterPwd (pwd,npwd){
    return this.httpService.HttpPost(AppConfig.urlRoot + 'wXKPLoginAction!alterPwd.shtml',{
        'pwd': pwd,
        'npwd': npwd
    })
  }

}
