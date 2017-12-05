import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InvoiceServiceProvider } from "../../Providers/invoice-service/invoice-service";
import { AppIonicUtil } from "../../app/app.ionic.util";
import { InvoiceDetailPage } from '../invoice-detail/invoice-detail';

@IonicPage()
@Component({
  selector: 'page-invoice-list',
  templateUrl: 'invoice-list.html',
})
export class InvoiceListPage {

  title = "发票管理";
  invoiceList = [];
  params = {
    value:''
  };
  state
  index = 1;
  _allSize = 0;
  size = 25;
  canLoad = true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private invoiceService:InvoiceServiceProvider,
    public appIonicUtil:AppIonicUtil
  ) {
    this.state = this.navParams.get('state');
    this.initData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoiceListPage');
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
      let loading = this.appIonicUtil.loading('加载中··');
      this.index = 1;
      this.invoiceService.getWXKPInvoiceListCount(this.navParams.data.type,this.state,this.params.value).then(res =>{
          this._allSize = res.Data.dataSize;
          this.invoiceService.getWXKPInvoiceVoList(this.index,this.navParams.data.type,this.state,this.params.value).then(res =>{
              if(res.isSuccess){
                this.invoiceList = res.Data;
                if(this._allSize <= this.size){
                  //this.loadMoreBtnShow = false;
                }else{
                  //this.loadMoreBtnShow = true;
                }
              }else{
                this.appIonicUtil.toast('数据读取失败！');
              }
            }).catch(erro =>{
                this.appIonicUtil.toast('数据读取失败！');
            }).catch(erro =>{
                this.appIonicUtil.toast('数据读取失败！');
            })
          })
          loading.dismiss();
    }

    look (id){
      this.navCtrl.push(InvoiceDetailPage,{'id':id});
    };

    loadMore (){
      try{
        this.index = this.index + 1;
        this.invoiceService.getWXKPInvoiceVoList(this.index,this.navParams.data.type,this.state,this.params.value).then(res =>{
            if(res.isSuccess){
              for(var i=0;i<res.Data.length;i++){
                this.invoiceList.push(res.Data[i]);
              }
              if(this.invoiceList.length >= this._allSize){
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
