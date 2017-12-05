import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { InvoiceFormPage } from '../invoice-form/invoice-form';
import { InvoiceListPage } from '../invoice-list/invoice-list';
import { AppConfig } from "../../app/app.config";
import { AppUtil } from "../../app/app.util";
import { MessagePage } from '../message/message';
//import { JPushServiceProvider } from "../../Providers/j-push-service/j-push-service";
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  title="主页";
  ccInfo = {
    id:'',
    phone:'',
    kper:{
      id:'',
      name:''
    },
    ccNames: '',
    ccTaxNums: ''
  };
  ccNames = [];
  kpyNames = [];
  ccTaxNums = [];

  constructor(
    public navCtrl: NavController, 
    private appUtil:AppUtil,
    //private jPushPlugin:JPushServiceProvider
  ) {
    if( ! this.appUtil.isNull(AppConfig.urlRoot)){
      this.initData()
    }
    //this.jPushPlugin.initJpush();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  addInvoice(){
    this.navCtrl.push(InvoiceFormPage);
  }

  openMessageModal(){
    this.navCtrl.push(MessagePage);
  }

  goInvoice (){
    this.navCtrl.push(InvoiceListPage);
  }

  initData () {
    try{
      this.ccInfo = AppConfig.ccInfo;
        if(this.ccInfo.ccNames.indexOf(',') != -1) {
          this.ccNames = this.ccInfo.ccNames.split(',');
          let index = 0;
          for (let i = 0; i < this.ccNames.length; i++) {
            let flag = false;
            let letfIndex = this.ccNames[i].indexOf('{');
            let rightIndex = this.ccNames[i].indexOf('}');

            let parLeftIndex = this.ccNames[i].indexOf('(');
            let parRightIndex = this.ccNames[i].indexOf(')');

            for (let j = 0; j < index; j++) {
              if (this.kpyNames[j] == this.ccNames[i].substring(letfIndex + 1, rightIndex) + '        联系电话:' + this.ccNames[i].substring(parLeftIndex + 1, parRightIndex)) {
                flag = true;
              }
            }

            if (flag == false) {
              this.kpyNames[index] = this.ccNames[i].substring(letfIndex + 1, rightIndex) + '        联系电话:' + this.ccNames[i].substring(parLeftIndex + 1, parRightIndex);
              index ++ ;
            }

            this.ccNames[i] = this.ccNames[i].substring(0,letfIndex);
           }
          this.ccTaxNums = this.ccInfo.ccTaxNums.split(',');
        }else{
          this.ccNames = [this.ccInfo.ccNames];
          let letfIndex = this.ccNames[0].indexOf('{');
          let rightIndex = this.ccNames[0].indexOf('}');
          let parLeftIndex = this.ccNames[0].indexOf('(');
          let parRightIndex = this.ccNames[0].indexOf(')');

          this.kpyNames = [this.ccNames[0].substring(letfIndex+1,rightIndex) + '        联系电话:' + this.ccNames[0].substring(parLeftIndex+1,parRightIndex)];

          this.ccNames = [this.ccNames[0].substring(0,letfIndex)];
          this.ccTaxNums = [this.ccInfo.ccTaxNums];
        }
          
    }catch (e){
       console.log(e);
    }
  }



}
