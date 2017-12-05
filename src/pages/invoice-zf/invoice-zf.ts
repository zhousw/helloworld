import { Component } from '@angular/core';
import { IonicPage, NavController,AlertController } from 'ionic-angular';
import { Invoice } from "../../Model/invoice";
import { AppUtil } from "../../app/app.util";
import { AppIonicUtil } from "../../app/app.ionic.util";
import { InvoiceServiceProvider } from "../../Providers/invoice-service/invoice-service";
@IonicPage()
@Component({
  selector: 'page-invoice-zf',
  templateUrl: 'invoice-zf.html',
})
export class InvoiceZfPage {

  title = '申请作废';
  zfDescInfo = {
    value:''
  };
  invoice = Invoice;
  constructor(
    public navCtrl: NavController,
    private appUtil:AppUtil,
    private appIonicUtil:AppIonicUtil,
    private alertCtrl:AlertController,
    private invoiceService:InvoiceServiceProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoiceZfPage');
  }


  //提交作废
  subFZF (){
    try{
      if(this.appUtil.isNull(this.zfDescInfo.value)){
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
              this.invoiceService.applyZF(this.invoice.id,this.zfDescInfo.value).then(res=>{
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
