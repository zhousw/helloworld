import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import * as $ from 'jquery';
import { Http} from '@angular/http';
import { LoginServiceProvider } from '../../Providers/login-service/login-service';
import { AppConfig } from './../../app/app.config';
import { AppUtil } from '../../app/app.util';
import { AppIonicUtil } from '../../app/app.ionic.util';
@IonicPage()
@Component({
  selector: 'page-set-server-path',
  templateUrl: 'set-server-path.html',
})
export class SetServerPathPage {
  title = "设置"
  serverPath ='';
  constructor(
    public navCtrl: NavController, 
    public http : Http,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public loginService : LoginServiceProvider,
    private appIonicUtil: AppIonicUtil,
    private appUtil     : AppUtil
  ) {

    //config.views.maxCache(0);//清除缓存
    AppConfig.loginTimeoutAlert = 0;
    this.getSerPath();

  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SetServerPathPage');
  }

  getSerPath(){  //从localStorage中获取服务器地址
    try{
        let serverPath = window.localStorage.getItem('serverPath');
        this.serverPath = serverPath;
        if( ! this.appUtil.isNull(serverPath)){
          AppConfig.urlRoot = 'http://'+serverPath+'/tabiz/weixinkp/';
          AppConfig.rootIp = serverPath;
          AppConfig.rootPath = 'http://'+serverPath+'/tabiz/';
          AppConfig.pPath = 'http://'+serverPath+'/tabiz/admin/';
        }
    }catch (e){
        console.error(e);
    }
  };

    saveSerPath(){ //保存或更新服务器地址
      try{
          let loading = this.appIonicUtil.loading('请求中···');
          let requestPath=$.trim(this.serverPath);
          if( this.appUtil.isNull(requestPath)){
            this.appIonicUtil.toast("请输入服务器地址！")
            return 
          }
          this.loginService.checkServerPath(requestPath).then(res =>{
              if(res.isSuccess){
                  //设置服务器地址到localStorage
                  window.localStorage.removeItem('serverPath');
                  window.localStorage.setItem('serverPath',requestPath);
 
                  AppConfig.urlRoot = 'http://'+requestPath+'/tabiz/weixinkp/';

                  window.localStorage.removeItem('urlRoot');
                  window.localStorage.setItem('urlRoot',AppConfig.urlRoot);
                  AppConfig.rootIp = requestPath;
                  AppConfig.rootPath = 'http://'+requestPath+'/tabiz/';
                  AppConfig.pPath = 'http://'+requestPath+'/tabiz/admin/';
                  this.appIonicUtil.toast("保存成功")
                  this.navCtrl.pop();
              }else{
                this.appIonicUtil.toast("服务器地址错误或服务器未启动！")
              }
          }).catch(erro =>(this.appIonicUtil.toast('服务器地址错误或服务器未启动！')))
          loading.dismiss();
      }catch (e){
          console.error(e)
      }
  };
}
