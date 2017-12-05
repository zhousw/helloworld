import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import * as $ from 'jquery';
import { AppConfig } from '../../app/app.config';
import { HttpService } from '../HttpService';
import { Platform} from 'ionic-angular';
import { BackButtonServiceProvider } from "../../Providers/back-button-service/back-button-service";
@Injectable()
export class LoginServiceProvider {

  constructor(
    public http : Http,
    private httpService:HttpService,
    private platform:Platform,
    private backButtonService:BackButtonServiceProvider
  ) {
    console.log('Hello LoginService Provider');
      this.platform.ready().then(() => {
        this.backButtonService.registerBackButtonAction(null);
     });
  }
  
      //检查服务器地址
    checkServerPath(info){ 
        //'121.40.139.136:7070';  //测试ip
        return this.httpService.HttpPost('http://'+$.trim(info)+'/tabiz/weixinkp/wXKPLoginAction!testServerPath.shtml');
      }

    //登录
    login(obj){
        return this.httpService.HttpPost(AppConfig.urlRoot+'wXKPLoginAction!login.shtml',obj)
    }

    //重置密码
    rePwd (obj){
      return this.httpService.HttpPost(AppConfig.urlRoot + 'wXKPLoginAction!rePwd.shtml',obj)
    }



}
