import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InvoiceServiceProvider } from "../../Providers/invoice-service/invoice-service";
import { Invoice } from "../../Model/invoice";
import { AppIonicUtil } from "../../app/app.ionic.util";

@IonicPage()
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage {
  title = "收件人信息";
  addressLists = [];

  private invoice = Invoice;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public invoiceService:InvoiceServiceProvider,
    public appIonicUtil:AppIonicUtil
  ) {
    this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressPage');
  }

  init(){
    try{
      this.invoiceService.getWXKPAddressVoListByClient(this.invoice.wXKPClientId).then(res=>{
          if(res.isSuccess){
            this.addressLists = res.Data;
          }else{
            this.appIonicUtil.toast('数据读取失败！');
          }
        }).catch((erro)=>{
          this.appIonicUtil.toast('数据读取失败！');
        })
    }catch (e){
      console.error(e);
    }
  }

  selectAddress (consignee,phone,address){
    try{
      this.invoice.addressConsignee = consignee;
      this.invoice.addressPhone = phone;
      this.invoice.addressAddress = address;
      this.invoice.addressGsName = this.invoice.gname;

      this.navCtrl.pop();
    }catch (e){
      console.error(e);
    }
  };


}
