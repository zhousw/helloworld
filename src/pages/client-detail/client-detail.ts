import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClientServiceProvider } from "../../Providers/client-service/client-service";
import { AppIonicUtil } from "../../app/app.ionic.util";
import { AddressListPage } from "../address-list/address-list";
import { AppUtil } from "../../app/app.util";
@IonicPage()
@Component({
  selector: 'page-client-detail',
  templateUrl: 'client-detail.html',
})
export class ClientDetailPage {
  title = "客户详情";
  client = {};  //客户名单
  id : number;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private clientService:ClientServiceProvider,
    public appIonicUtil:AppIonicUtil,
    private appUtil:AppUtil
    ) {
      if(! this.appUtil.isNull(this.navParams.get('clientId'))){
        this.id= this.navParams.get('clientId')
      }
      this.initData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientDetailPage');
  }

  initData (){
    try{
        let loading = this.appIonicUtil.loading("加载中···");
        this.clientService.getWXKPClientVo(this.id).then(res =>{
            if(res.isSuccess){
                this.client = res.Data;
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

    goAddress (){
      this.navCtrl.push(AddressListPage,{clientId:this.id});
    };



}
