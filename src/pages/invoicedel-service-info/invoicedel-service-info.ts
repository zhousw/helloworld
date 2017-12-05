import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AppUtil } from "../../app/app.util";
import { AppIonicUtil } from "../../app/app.ionic.util";
import * as angular from "angular";
import { Invoicedel } from "../../Model/invoicedel";

@IonicPage()
@Component({
  selector: 'page-invoicedel-service-info',
  templateUrl: 'invoicedel-service-info.html',
})
export class InvoicedelServiceInfoPage {
  title = "服务名称";
  invoicedelServiceInfoList = [];
  invoicedel = Invoicedel
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private appUtil:AppUtil,
    public alertCtrl:AlertController,
    public appIonicUtil:AppIonicUtil
  ) {
    let invoicedelInfo = window.localStorage.getItem('invoicedelInfo');
    if(!this.appUtil.isNull(invoicedelInfo)){
      this.invoicedelServiceInfoList = angular.fromJson(invoicedelInfo);
    }else{
      this.invoicedelServiceInfoList = [];
    }
  }

  ionViewDidLoad() {
    
    console.log('ionViewDidLoad InvoicedelServiceInfoPage');
  }

  selectInvoicedelServiceInfo (info){
    this.invoicedel.serviceName = info.serviceName;
    this.invoicedel.typeInfo = info.typeInfo;
    this.invoicedel.unitInfo = info.unitInfo;
    this.invoicedel.price = info.price;
    this.invoicedel.taxr = info.taxr;
    this.navCtrl.pop();
  }

  deleteInvoicedelServiceInfo (index){
    this.alertCtrl.create({
      title: '提示',
      message: '确认删除？',
      buttons: [
        {
          text: '是',
          handler: () => {            
              let json = window.localStorage.getItem('invoicedelInfo');
              let invoicedelInfo = [];
              if(!this.appUtil.isNull(json)){
                invoicedelInfo = angular.fromJson(json);
              }
              invoicedelInfo.splice(index,1);
              window.localStorage.setItem('invoicedelInfo',angular.toJson(invoicedelInfo));
              this.invoicedelServiceInfoList.splice(index,1);
              this.appIonicUtil.toast('删除成功！');
            
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
  }

  




}
