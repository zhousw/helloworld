import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { ClientServiceProvider } from "../../Providers/client-service/client-service";
import { AppIonicUtil } from "../../app/app.ionic.util";
import { ClientDetailPage } from '../client-detail/client-detail';
import { ClientFormPage } from '../client-form/client-form';
import { AppUtil } from "../../app/app.util";
import * as $ from "jquery";
@IonicPage()
@Component({
  selector: 'page-client-cist',
  templateUrl: 'client-List.html',
})
export class ClientListPage {
  title="客户名单";
  size = 25;
  _allSize = 0;
  index = 1;
  propList = [];
  clientLists = [];
  fieldName = {
    value:''
  };
  paramString = {
    value:''
  };
  paramStringFieldList = [];
  canLoad = true
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private clientService:ClientServiceProvider,
    public appIonicUtil:AppIonicUtil,
    public alertCtrl:AlertController,
    private appUtil:AppUtil,
  ) {
    this.initData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientListPage');
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
        this.clientService.getWXKPClientListCount(this.fieldName.value,this.paramString.value,this.navParams.data.type).then(res=>{
            this._allSize = res.Data.dataSize;
            this.clientService.getWXKPClientVoList(this.index,this.fieldName.value,this.paramString.value,this.navParams.data.type).then(res=>{
                if(res.isSuccess){
                    this.clientLists = res.Data;
                    if(this._allSize <= this.size){
                      //this.appIonicUtil.toast('我是有底线的',1500);
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
        }).catch(erro =>{
          this.appIonicUtil.toast('数据读取失败！');
        })
        loading.dismiss();
    }catch (e){
        console.error(e);
    }
  };

  clientDetail(id){
    this.navCtrl.push(ClientDetailPage,{clientId:id});
  }

  delete (id){
    this.alertCtrl.create({
      title: '提示',
      message: '<span class="rem-3">确认删除吗？</span>', 
      buttons: [
        {
          text: '是',
          handler: () => {            
            this.clientService.deleteData(id).then(res =>{
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
    }

    edit (id){
      this.navCtrl.push(ClientFormPage,{clientId:id,reloadData: this})
    };

    reloadData(){
      this.initData();
    }

    loadMore (){
      try{
          this.index = this.index + 1;
          this.clientService.getWXKPClientVoList(this.index,this.fieldName.value,this.paramString.value,this.navParams.data.type).then(res =>{
              if(res.isSuccess){
                  for(var i=0;i<res.Data.length;i++){
                      this.clientLists.push(res.Data[i]);
                  }
                  if(this.clientLists.length >= this._allSize){
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
      };

     buildParamString (){
        try{
            this.paramStringFieldList.splice(0,this.paramStringFieldList.length);
            this.paramString.value = '';
            if(!this.appUtil.isNull(this.fieldName.value)){
                for(var i=0;i<this.propList.length;i++){
                    if(this.propList[i].fieldName == this.fieldName.value){
                        if(!this.appUtil.isNull(this.propList[i].mapValue)){
                            var mapValues = this.propList[i].mapValue.split(",");
                            var mapResults = this.propList[i].mapResult.split(",");
                            $.each(mapValues,function(i,val){
                                var obj = new Array();
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


    addClient (){
       this.navCtrl.push(ClientFormPage,{reloadData: this});
    };



}
