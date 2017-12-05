import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomeServiceProvider } from "../../Providers/home-service/home-service";
import { AppIonicUtil } from "../../app/app.ionic.util";
import { InvoiceListPage } from '../invoice-list/invoice-list';
//import { JPushServiceProvider } from "../../Providers/j-push-service/j-push-service";
@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {

  title = '消息';
  messageList = [];
  messageBadge = 0;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private homeService:HomeServiceProvider,
    public appIonicUtil:AppIonicUtil,
    //private jPushPlugin:JPushServiceProvider
  ) {
    this.initData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
  }

 initData () {
   let loading = this.appIonicUtil.loading('请求中···');
    this.homeService.getMessageInfo().then(res =>{
        if(res.isSuccess){
          this.messageList = res.Data;
          this.messageBadge = res.badge;
          //this.jPushPlugin.setApplicationIconBadgeNumber(res.badge);  //极光推送
        }else{
          this.appIonicUtil.toast('数据读取失败！');
        }
      }).catch(erro =>{
          this.appIonicUtil.toast('数据读取失败！');
      })
      loading.dismiss();
    }

    goMessageState (type){
      if(type == 1){
        this.navCtrl.push(InvoiceListPage,{state:'1'});
      }else{
        this.navCtrl.push(InvoiceListPage,{state:'4'});
      }
      this.navCtrl.pop();
    }



}
