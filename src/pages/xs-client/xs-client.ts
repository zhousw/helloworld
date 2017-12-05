import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InvoiceServiceProvider } from "../../Providers/invoice-service/invoice-service";
import { AppIonicUtil } from '../../app/app.ionic.util';
import { AppUtil } from "../../app/app.util";
import { Invoice } from '../../Model/invoice';
import * as $ from "jquery";

@IonicPage()
@Component({
  selector: 'page-xs-client',
  templateUrl: 'xs-client.html',
})
export class XsClientPage {
  title="客户信息";
  clientLists = [];

  public invoice = Invoice
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private invoiceService:InvoiceServiceProvider,
    private appIonicUtil: AppIonicUtil,
    public appUtil:AppUtil
  ) {
    this.initWxkpXsClientData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad XsClientPage');
  }

  initWxkpXsClientData(){
    this.invoiceService.getCorporateVoListByConsult().then(res =>{
        if(res.isSuccess){
          this.clientLists = res.Data;
        }else{
          this.appIonicUtil.toast('数据读取失败！');
        }
      })
  }

  selectXsClient (id,taxNum,name,address,phone,bank,account){
    try{
      this.invoice.corporateId = id;
      this.invoice.taxNumxs = taxNum;
      this.invoice.namexs = name;
      this.invoice.addressxs = address;
      this.invoice.phonexs = phone;
      this.invoice.bankxs = bank;
      this.invoice.accountxs = account;
      if($('input[name="invoice.signInType"]:checked').val() == '1'){
        this.invoiceService.getWXKPAddressVoByClientCorporate(id).then(res =>{
            if(res.isSuccess && !this.appUtil.isNull(res.Data) ){
              this.invoice.addressConsignee = res.Data.consignee;
              this.invoice.addressPhone = res.Data.phone;
              this.invoice.addressAddress = res.Data.address;
              this.invoice.addressGsName = '';
            }else{
              this.invoice.addressConsignee = '';
              this.invoice.addressPhone = '';
              this.invoice.addressAddress = '';
              this.invoice.addressGsName = '';
            }
        });
      }
      this.navCtrl.pop();
    }catch (e){
      console.error(e);
    }
  };
   
}
