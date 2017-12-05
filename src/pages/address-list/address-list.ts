import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import { AddressServiceProvider } from "../../Providers/address-service/address-service";
import { AppIonicUtil } from "../../app/app.ionic.util";
import { AddressFormPage } from "../address-form/address-form";
import { AppUtil } from "../../app/app.util";
import * as $ from "jquery";
import { AddressDetailPage } from '../address-detail/address-detail';

@IonicPage()
@Component({
  selector: 'page-address-list',
  templateUrl: 'address-list.html',
})
export class AddressListPage {
  title = '客户收件人信息';
  fieldName = {
    value:''
  };
  paramString = {
    value:''
  };
  _allSize = 0;
  index = 1;
  addressLists = [];
  size = 25;
  paramStringFieldList = [];
  propList = [];
  clientId :number
  canLoad=true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private addressService:AddressServiceProvider,
    public appIonicUtil:AppIonicUtil,
    private appUtil:AppUtil,
    public alertCtrl:AlertController
    ) {
        if( ! this.appUtil.isNull(this.navParams.get('clientId'))){
          this.clientId = this.navParams.get('clientId');
        }
        if(this.addressService.getIsUpdate() == 1){
          
          this.addressService.setIsUpdate(0);
        }
        this.initData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressListPage');
  }

  
  doRefresh(refresher) {
      setTimeout(() => {
        this.initData();
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

  initData (){
    try{
      let loading = this.appIonicUtil.loading("加载中···");
        this.index = 1;
        this.addressService.getWXKPAddressListCount(this.fieldName.value,this.paramString.value,this.navParams.data.type,this.clientId).then(res =>{
            this._allSize = res.Data.dataSize;
            this.addressService.getWXKPAddressVoList(this.index,this.fieldName.value,this.paramString.value,this.navParams.data.type,this.clientId).then(res =>{
                if(res.isSuccess){
                    this.addressLists = res.Data;
                    if(this._allSize <= this.size){
                       //this.appIonicUtil.toast("我是有底线的",1500)
                    }else{
                        //this.loadMoreBtnShow = true;
                    }
                }else{
                  this.appIonicUtil.toast('数据读取失败！');
                }
            }).catch(erro =>{
              this.appIonicUtil.toast('数据读取失败！');
            })
          }).catch(erro =>{
            this.appIonicUtil.toast('数据读取失败！');
          })
          loading.dismiss();
        }catch (e){
            console.error(e);
        }
      };

      addAddress(){
        this.navCtrl.push(AddressFormPage,{clientId:this.clientId,reloadData: this});
      }

     buildParamString (){
        try{
            this.paramStringFieldList.splice(0,this.paramStringFieldList.length);
            this.paramString.value = '';
            if(!this.appUtil.isNull(this.fieldName.value)){
                for(let i=0;i<this.propList.length;i++){
                    if(this.propList[i].fieldName == this.fieldName.value){
                        if(!this.appUtil.isNull(this.propList[i].mapValue)){
                            let mapValues = this.propList[i].mapValue.split(",");
                            let mapResults = this.propList[i].mapResult.split(",");
                            $.each(mapValues,function(i,val){
                                let obj = new Array();
                                obj[0] = val;
                                obj[1] = mapResults[i];
                                this.paramStringFieldList.push(obj);
                            });
                            this.paramString.value = this.paramStringFieldList[0][0];
                        }
                    }
                }
            }
        }catch (e){
            console.error(e);
        }
    }

    addressDetail(id){
      this.navCtrl.push(AddressDetailPage,{addressId:id});
    }

    delete (id){
      this.alertCtrl.create({
        title: '提示',
        message: '<span class="rem-3">确认提交？</span>',
        buttons: [
          {
            text: '是',
            handler: () => {            
              this.addressService.deleteData(id).then(res =>{
                  if(res.isSuccess){
                      this.appIonicUtil.toast('删除成功！');
                      this.initData();
                  }else{
                    this.appIonicUtil.toast(res.desc);
                  }
              }).catch(erro =>{
                this.appIonicUtil.toast('删除失败！');
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
    };

    edit (id){
      this.navCtrl.push(AddressFormPage,{id:id,clientId:this.clientId,reloadData: this});
    };

    reloadData(){
      this.initData()
    }

    loadMore (){
      try{
          this.index = this.index + 1;
          this.addressService.getWXKPAddressVoList(this.index,this.fieldName.value,this.paramString.value,this.navParams.data.type,this.clientId).then(res =>{
              if(res.isSuccess){
                  for(var i=0;i<res.Data.length;i++){
                      this.addressLists.push(res.Data[i]);
                  }
                  if(this.addressLists.length >= this._allSize){
                    this.appIonicUtil.toast('我是有底线的');
                    this.canLoad = false
                      //this.loadMoreBtnShow = false;
                  }else{
                      //this.loadMoreBtnShow = true;
                  }
              }else{
                this.appIonicUtil.toast('数据读取失败！');
              }
          }).catch(erro =>{
            this.appIonicUtil.toast('数据读取失败！');
          })
        }catch (e){
            console.error(e);
        }
      }


}
