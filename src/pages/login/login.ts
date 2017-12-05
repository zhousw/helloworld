import { Component } from '@angular/core';
import { IonicPage, NavController,AlertController  } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { SetServerPathPage } from '../set-server-path/set-server-path';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { LoginServiceProvider } from '../../Providers/login-service/login-service';
import * as $ from 'jquery';
import * as base64 from 'base-64';
import * as angular from 'angular';
import { AppConfig } from './../../app/app.config';
import { AppUtil } from '../../app/app.util';
import { AppIonicUtil } from '../../app/app.ionic.util';
//import { JPushServiceProvider } from "../../Providers/j-push-service/j-push-service";
@IonicPage()
@Component({
  selector    : 'page-login',
  templateUrl : 'login.html',
})
export class LoginPage {
  title       = '登录';
  serverPath  = {
      value: ''
  };
  cc = {
    phone: localStorage.getItem("accountNum"),
    pwd: ''
  };
  public loginForm      : FormGroup;

  constructor(
    private navCtrl     : NavController, 
    public loginService : LoginServiceProvider,
    private formBuilder : FormBuilder,
    private appIonicUtil: AppIonicUtil,
    private appUtil     : AppUtil,
    public alertCtrl    :AlertController,
    //public jPushPlugin:JPushServiceProvider
  ) {
    this.loginForm=this.formBuilder.group({
      phone:['',Validators.required],
      pwd:['',Validators.required]
    });


  }

  openSetServerModal () {
    this.navCtrl.push(SetServerPathPage);
  };

  login(values){
    try{
        let loading = this.appIonicUtil.loading('请求中···');
        let phone = $.trim(values.phone)
        let pwd   = $.trim(values.pwd)
        if( this.appUtil.isNull(AppConfig.urlRoot)){
          this.appIonicUtil.toast("请设置服务器地址！");
        }else if( this.appUtil.isNull(phone)){
          this.appIonicUtil.toast("请输入用户名！");
        }else if( this.appUtil.isNull(pwd)){
          this.appIonicUtil.toast("请输入密码");
        }else{
          this.loginService.login(values).then((res) =>{

                if(res && res.isSuccess){
                  window.localStorage.setItem("accountNum",phone);
                  //window.localStorage.maxCache(10);  //重新设置缓存
                    let ccInfo = {
                      'phone': '',
                      'pwd': ''
                    };
                    ccInfo.phone = phone;
                    ccInfo.pwd = base64.encode(pwd);

                    //设置登录用户密码到localStorage
                    window.localStorage.removeItem('ccInfo');
                    window.localStorage.setItem('ccInfo',angular.toJson(ccInfo));

                    this.appUtil.setObjInfo(res.Data);
                    if(!this.appUtil.isNull(res.Data.alias)){
                       //this.jPushPlugin.setAlias(res.Data.alias); //设置jpush Alias
                     }
                    this.navCtrl.setRoot(TabsPage);  //转到主页
                }else{
                  this.appIonicUtil.toast(res.desc);
                }
            }).catch(erro =>(this.appIonicUtil.toast('登录失败！')))
        }
        loading.dismiss();
    }catch (e){
        console.error(e)
    }
};

  ionViewDidLoad() {

  }
  
  rePwd (){  //重置密码
    try{
      if(this.appUtil.isNull(this.cc.phone)){
        this.appIonicUtil.toast("请输入手机号！",);
        return;
      }
      this.alertCtrl.create({
        title: '提示',
        message: '<span class="rem-3">是否重置密码？重置后新密码将发送至您的手机</span>',
        buttons: [
          {
            text: '是',
            handler: (res) => { 
                this.loginService.rePwd(this.cc.phone).then(res => {
                  if(res.isSuccess){
                    this.appIonicUtil.toast('重置短信发送成功！');
                  }else{
                    this.appIonicUtil.toast(res.desc);
                  }
                }).catch(erro =>(this.appIonicUtil.toast('操作失败！')))
              }           
          },
          {
            text: '否',
            handler: (res) => {            
            }
          }
        ]
    }).present();

    }catch (e){
      console.error(e);
    }
  };




}
