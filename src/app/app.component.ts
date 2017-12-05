import { Component  } from '@angular/core';
import { Platform ,AlertController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from "../pages/login/login";
import { TabsPage } from '../pages/tabs/tabs';
import { AppUtil } from '../app/app.util';
import { JPush } from 'ionic3-jpush';
//import { Push } from '@ionic-native/push';
import * as angular from 'angular';
import * as base64 from "base-64";
import { AppConfig } from './app.config';
import { AppServiceProvider } from "../Providers/app-service/app-service";
import { Network } from '@ionic-native/network';
import { LoginServiceProvider } from "../Providers/login-service/login-service";
import { HomePage } from '../pages/Home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(
    private platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private appUtil:AppUtil,
    private alertCtrl:AlertController,
    public jPush:JPush,
    //public push:Push,
    private appService:AppServiceProvider,
    private network:Network,
    private loginService:LoginServiceProvider
  ) {
    platform.ready().then(() => {
      
      statusBar.styleDefault();
      splashScreen.hide();

      this.network.onDisconnect().subscribe(()=>{
        this.alertCtrl.create({
          title: '提示',
          message: '未连接网络，连接后新启动！',
          buttons: [
            {
              text: '重启',
              handler: () => {            
                if(this.platform.is('android')){
                  this.platform.exitApp();
                }
              }
            },
            {
              text: '关闭',
              handler: () => {            
                  
              }
              }
            ]
        }).present();
       
      })

      //自动登录
      let urlRoot= window.localStorage.getItem('urlRoot');
      let ccInfo = angular.fromJson(window.localStorage.getItem('ccInfo'));
      if(! this.appUtil.isNull(urlRoot) && ! this.appUtil.isNull(ccInfo)){
         let pwd = base64.decode(ccInfo.pwd);
         AppConfig.urlRoot = urlRoot;
         this.loginService.login({
           phone:ccInfo.phone,
           pwd:pwd
         }).then(res=>{
           if(res && res.isSuccess){
             this.appUtil.setObjInfo(res.Data);
             if(!this.appUtil.isNull(res.Data.alias)){
               //this.jPushPlugin.setAlias(res.Data.alias); //设置jpush Alias
             }
             this.rootPage = TabsPage
           }else{
             this.rootPage = LoginPage
           }
         })
      }else{
         this.rootPage = LoginPage
      }

      if(this.platform.is('android')){  //如果是android 检查更新  ios不用检查更新
        appService.checkUpdate();
      }
     
        //初始化jpush服务
          this.jPush.init().then((data)=>{
            let notification = angular.fromJson(data.toString());
            //ios
            if (this.platform.is('ios')) {
              //app 是否处于正在运行状态
              let isActive = notification.isActive;
              if(isActive){
                if(AppConfig.notificationAlert == 0){
                  AppConfig.notificationAlert = 1;
                  this.alertCtrl.create({
                    title: '通知',
                    message: '<span class="rem-3">' + notification.aps.alert + '</span>',
                    buttons: [
                      {
                        text: '好',
                        handler: () => {            
                          AppConfig.notificationAlert = 0;
                        }
                      },
                      {
                        text: '关闭',
                        handler: () => {            
                            
                        }
                      }
                      ]
                  }).present();
                }
              }else{            }
            } else {//android
              alert('init:'+data)
            }
          }).catch((erro)=>{
                alert(erro)
              })
        this.androidGetRegId();

        this.jPush.openNotification()
        .subscribe( res => {
          alert('收到推送'+res);
          console.log(res)
        });
  
        this.jPush.receiveNotification()
          .subscribe( res => {
            alert('收到推送'+res);
            console.log(res)
        });
  
        this.jPush.receiveMessage()
          .subscribe( res => {
            alert('收到推送'+res);
            console.log(res)
        });
      
 });
}

    //Android端获取RegestrationId，用于消息推送
    androidGetRegId(){
      this.jPush.getRegistrationID()
      .then(regId => {
        alert('推送id:'+regId)
        //window.localStorage.setItem('regId', regId);
      })
      .catch(err => alert(err))
    }


}
