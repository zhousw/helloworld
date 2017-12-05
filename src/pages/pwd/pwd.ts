import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController } from 'ionic-angular';
import { AppIonicUtil } from '../../app/app.ionic.util';
import { AppUtil } from "../../app/app.util";
import { PwdServiceProvider } from "../../Providers/pwd-service/pwd-service";
import { TabsPage } from '../tabs/tabs';
@IonicPage()
@Component({
  selector: 'page-pwd',
  templateUrl: 'pwd.html',
})
export class PwdPage {

  title = '修改密码';
  pwd = {
      'value': ''
  };
  npwd = {
      'value': ''
  };
  snpwd = {
      'value': ''
  };
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl    : AlertController,
    private appIonicUtil: AppIonicUtil,
    private appUtil:AppUtil,
    private pwdService:PwdServiceProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PwdPage');
  }

   //提交
    subFData (){
    try{
        if(this.appUtil.isNull(this.pwd.value)){
            this.appIonicUtil.toast('请输入原密码！');
            return;
        }
        if(this.appUtil.isNull(this.npwd.value)){
          this.appIonicUtil.toast('请输入新密码！');
            return;
        }
        if(this.npwd.value != this.snpwd.value){
          this.appIonicUtil.toast('两次输入的新密码不一致！');
            return;
        }
        this.alertCtrl.create({
          title: '提示',
          message: '<span class="rem-3">确认提交？</span>',
          buttons: [
            {
              text: '是',
              handler: () => {            
                this.pwdService.alterPwd(this.pwd.value,this.npwd.value).then(res =>{
                    if(res.isSuccess){
                        this.appIonicUtil.toast('提交成功！');
                        this.navCtrl.push(TabsPage);
                    }else{
                      this.appIonicUtil.toast(res.desc);
                    }
                }).catch(()=>{
                  this.appIonicUtil.toast('提交失败！');
                })
              }
            },
            {
              text: '否',
              handler: () => {            
                  console.log('否');
              }
            }
          ]
        }).present();
      }catch (e){
          console.error(e);
      }
    }
  

  
}
