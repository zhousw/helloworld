import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AppUtil } from "../../app/app.util";
import { ClientServiceProvider } from "../../Providers/client-service/client-service";
import { AppIonicUtil } from "../../app/app.ionic.util";
//import * as angular from "angular";
@IonicPage()
@Component({
  selector: 'page-client-form',
  templateUrl: 'client-form.html',
})
export class ClientFormPage {


  id : number;
  title = '客户信息';
  client = {
    id:'',
    taxNum:'',
    name:'',
    address:'',
    phone:'',
    bank:'',
    account:''
  };  //客户档案
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private appUtil:AppUtil,
    private clientService:ClientServiceProvider,
    private appIonicUtil:AppIonicUtil,
    public alertCtrl:AlertController,
  ) {
    this.id = this.navParams.get("clientId");
    
    this.initData();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientFormPage');
  }

  initData (){
    try{
       let loading = this.appIonicUtil.loading("加载中···");
        
        if(!this.appUtil.isNull(this.id)){
          this.clientService.getWXKPClientVo(this.id).then(res=>{
              if(res.isSuccess){
                this.client = res.Data;
              }else{
                this.appIonicUtil.toast('数据读取失败');
              }
            }).catch(erro =>{
                this.appIonicUtil.toast('数据读取失败！');
            })
          }
          loading.dismiss()
        }catch (e){
            console.error(e);
        }
        
    };

    //提交项目信息
    subFData (){
      try{
          if(this.appUtil.isNull(this.client)){
              this.appIonicUtil.toast('信息不能为空！');
              return;
          }
          this.alertCtrl.create({
            title: '提示',
            message: '<span class="rem-3">确认提交？</span>',
            buttons: [
              {
                text: '是',
                handler: () => {            
                  this.clientService.save(
                    this.client.id,this.client.taxNum,this.client.name,this.client.address,this.client.phone,this.client.bank,this.client.account
                  ).then(res =>{
                      if(res.isSuccess){
                          this.appIonicUtil.toast('提交成功！');
                          this.clientService.setIsUpdate(1);
                          this.navParams.get('reloadData').reloadData()
                          this.navCtrl.pop();
                      }else{
                        this.appIonicUtil.toast(res.desc);
                      }
                    }).catch(erro =>{
                      this.appIonicUtil.toast(erro);
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
