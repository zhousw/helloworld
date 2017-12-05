import { Component } from '@angular/core';
import { IonicPage, AlertController,NavController } from 'ionic-angular';
import { AppUtil } from "../../app/app.util";
import { AppIonicUtil } from "../../app/app.ionic.util";
import { InvoiceServiceProvider } from "../../Providers/invoice-service/invoice-service";
import { Invoice } from "../../Model/invoice";
@IonicPage()
@Component({
  selector: 'page-invoice-ck',
  templateUrl: 'invoice-ck.html',
})
export class InvoiceCkPage {

  title = '申请重开';
  ckDescInfo = {
    value:''
  };
  invoice = Invoice
  constructor(
    private appUtil:AppUtil,
    private appIonicUtil:AppIonicUtil,
    private alertCtrl:AlertController,
    private invoiceService:InvoiceServiceProvider,
    private navCtrl:NavController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoiceCkPage');
  }

  //提交重开
  subFCK (){
    try{
      if(this.appUtil.isNull(this.ckDescInfo.value)){
        this.appIonicUtil.toast('请填写说明！');
        return;
      }
      this.alertCtrl.create({
        title: '提示',
        message: '<span class="rem-3">确认提交？</span>',
        buttons: [
          {
            text: '是',
            handler: () => {            
              this.invoiceService.applyCK(this.invoice.id,this.ckDescInfo.value).then(res =>{
                  if(res.isSuccess){
                    this.appIonicUtil.toast('提交成功！');
                    this.invoiceService.setIsUpdate(1);
                    this.navCtrl.pop();
                  }else{
                    this.appIonicUtil.toast(res.desc);
                  }
              }).catch(()=>{
                this.appIonicUtil.toast('提交失败！');
              })
            }
          },
          {
            text: '否',
            handler: () => {            
                
            }
            }
          ]
      }).present()
      
    }catch (e){
      console.error(e);
    }
  };

  

}
