import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddressServiceProvider } from "../../Providers/address-service/address-service";
import { AppIonicUtil } from "../../app/app.ionic.util";
import { AppUtil } from "../../app/app.util";
@IonicPage()
@Component({
  selector: 'page-address-detail',
  templateUrl: 'address-detail.html',
})
export class AddressDetailPage {
  title = '客户收件人信息详情';
  address = {};  //地址簿

  addressId : number;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private addressService:AddressServiceProvider,
    public appIonicUtil:AppIonicUtil,
    private appUtil:AppUtil
  ) {
    if(!this.appUtil.isNull(this.navParams.get('addressId'))){
      this.addressId = this.navParams.get('addressId')
    }
    this.initData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressDetailPage');
  }

  initData (){
    try{
        let loading = this.appIonicUtil.loading("加载中···");
        this.addressService.getWXKPAddressVo(this.addressId).then(res =>{
            if(res.isSuccess){
                this.address = res.Data;
            }else{
                this.appIonicUtil.toast('数据读取失败！');
            }
        }).catch(erro =>{
            this.appIonicUtil.toast('数据读取失败！');
        })
        loading.dismiss();
    }catch (e){
        console.error(e);
    }
  };



}
