import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppIonicUtil } from '../../app/app.ionic.util';
import { InvoiceServiceProvider } from "../../Providers/invoice-service/invoice-service";
import { Invoice } from "../../Model/invoice";
import { AppUtil } from "../../app/app.util";
import * as $ from "jquery";

@IonicPage()
@Component({
  selector: 'page-client',
  templateUrl: 'client.html',
})
export class ClientPage {
  title="客户信息";
  index = 1;
  wClientParams = {
    value:''
  };
  _allSize = 0;
  size = 25;
  loadMoreBtnShow = false;
  clientLists = [];
  canLoad = true
  public invoice=Invoice
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private appIonicUtil: AppIonicUtil,
    private invoiceService:InvoiceServiceProvider,
    private appUtil:AppUtil
  ) {
    this.initWxkpClientData()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientPage');
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.initWxkpClientData();
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      if(this.canLoad){
        this.loadMore();
      }
      infiniteScroll.complete();
    }, 1000);
  }

  initWxkpClientData (){
    try{
      this.index = 1;
      this.invoiceService.getWXKPClientListCount(this.wClientParams.value).then(res => {
        this._allSize = res.Data.dataSize;
        this.invoiceService.getWXKPClientVoListByConsult(this.index,this.wClientParams.value).then(res => {
          if(res.isSuccess){
            this.clientLists = res.Data;
            if(this._allSize <= this.size){
              //this.loadMoreBtnShow = false;
            }else{
              //this.loadMoreBtnShow = true;
            }
          }else{
            this.appIonicUtil.toast('数据读取失败！');
          }
        }).catch(erro =>(this.appIonicUtil.toast('数据读取失败！')))
      }).catch(erro =>(this.appIonicUtil.toast('数据读取失败！')))

    }catch (e){
      console.error(e);
    }
  }

  selectClient (id,taxNum,name,address,phone,bank,account){
    try{
      this.invoice.wXKPClientId = id;
      this.invoice.taxNum = taxNum;
      this.invoice.gname = name;
      this.invoice.address = address;
      this.invoice.phone = phone;
      this.invoice.bank = bank;
      this.invoice.account = account;
      if($('input[name="invoice.signInType"]:checked').val() == '1'){
        this.invoiceService.getWXKPAddressVoByClient(id).then(res=>{
            if(res.isSuccess && !this.appUtil.isNull(res.Data) ){
              this.invoice.addressConsignee = res.Data.consignee;
              this.invoice.addressPhone = res.Data.phone;
              this.invoice.addressAddress = res.Data.address;
              this.invoice.addressGsName = this.invoice.gname;
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

  loadMore = function(){
    try{
      this.index = this.index + 1;
      this.invoiceService.getWXKPClientVoListByConsult(this.index).then(res =>{
          if(res.isSuccess){
            for(var i=0;i<res.Data.length;i++){
              this.clientLists.push(res.Data[i]);
            }
            if(this.clientLists.length >= this._allSize){
              //this.loadMoreBtnShow = false;
              this.appIonicUtil.toast('我是有底线的！',1500);
              this.canLoad = false
            }else{
              //this.loadMoreBtnShow = true;
            }
          }else{
            this.appIonicUtil.toast('数据读取失败！');
          }
        }).catch(erro=>{
            this.appIonicUtil.toast('数据读取失败！');
        })
    }catch (e){
      console.error(e);
    }
  };



}
