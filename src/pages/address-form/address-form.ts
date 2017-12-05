import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AppUtil } from "../../app/app.util";
import { AddressServiceProvider } from "../../Providers/address-service/address-service";
import { AppIonicUtil } from "../../app/app.ionic.util";

@IonicPage()
@Component({
  selector: 'page-address-form',
  templateUrl: 'address-form.html',
})
export class AddressFormPage {
  title = '编辑';
  address = {
    id:'',
    consignee:'',
    phone:'',
    address:'',
    isDefault:''
  };  //地址簿
  defaultVal = {
      
    value: false
  };
  id : number;
  clientId : number;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private appUtil:AppUtil,
    private addressService:AddressServiceProvider,
    public appIonicUtil:AppIonicUtil,
    public alertCtrl:AlertController
  ) {
    
    if(! this.appUtil.isNull(this.navParams.get('id'))){
      this.id = this.navParams.get('id')
    }
    if(! this.appUtil.isNull(this.navParams.get('clientId'))){
      this.clientId = this.navParams.get('clientId')
    }
    this.initData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressFormPage');
  }


  initData (){
    try{
      let loading = this.appIonicUtil.loading("加载中···");
        if(!this.appUtil.isNull(this.id)){
            this.addressService.getWXKPAddressVo(this.id).then(res =>{
                if(res.isSuccess){
                    this.address = res.Data;
                    if(this.address.isDefault == '是'){
                        this.defaultVal.value = true;
                    }else{
                        this.defaultVal.value = false;
                    }
                }else{
                  this.appIonicUtil.toast('数据读取失败！');
                }
            }).catch(erro =>{
              this.appIonicUtil.toast('数据读取失败！');
            })
        }
        loading.dismiss();
      }catch (e){
          console.error(e);
      }
    };

    //提交项目信息
    subFData(){
      try{
          if(this.appUtil.isNull(this.address)){
            this.appIonicUtil.toast('请检查所填信息！');
              return;
          }
          this.alertCtrl.create({
            title: '提示',
            message: '<span class="rem-3">确认提交？</span>',
            buttons: [
              {
                text: '是',
                handler: () => {            
                  if(this.defaultVal.value == true){
                        this.address.isDefault = '1';
                    }else{
                        this.address.isDefault = '0';
                    }
                    this.addressService.save(
                      this.address.id,this.clientId,this.address.consignee,this.address.phone,this.address.address,this.address.isDefault
                    ).then(res =>{
                        if(res.isSuccess){
                          this.appIonicUtil.toast('提交成功！');
                            this.addressService.setIsUpdate(1);
                            this.navParams.get('reloadData').reloadData();
                            this.navCtrl.pop();
                        }else{
                          this.appIonicUtil.toast(res.desc);
                        }
                    }).catch(erro =>{
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
