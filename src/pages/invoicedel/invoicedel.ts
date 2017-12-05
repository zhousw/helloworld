import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { Invoicedel } from "../../Model/invoicedel";
import { InvoicedelServiceInfoPage } from "../invoicedel-service-info/invoicedel-service-info";
import { AppUtil } from "../../app/app.util";
import { AppIonicUtil } from "../../app/app.ionic.util";
import { Invoice } from "../../Model/invoice";

@IonicPage()
@Component({
  selector: 'page-invoicedel',
  templateUrl: 'invoicedel.html',
})
export class InvoicedelPage {
  title="开票明细";
  invoicedel = Invoicedel;
  invoice = Invoice;
  isEdit = 0;
  editIndex = 0;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private appUtil:AppUtil,
    public appIonicUtil:AppIonicUtil,
    public alertCtrl:AlertController
  ) {
    this.invoicedel.taxr = '17%';
    this.editIndex = this.navParams.get('editIndex');
    if( ! this.appUtil.isNull(this.navParams.get('invoicedel'))){
      this.invoicedel = this.navParams.get('invoicedel')
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoicedelPage');
  }

  onblursHW (){
    if(this.invoicedel.serviceName == "" || this.invoicedel.serviceName==null){
      this.invoicedel.typeInfo = "";
      this.invoicedel.unitInfo = "";
      this.invoicedel.size = 0;
      this.invoicedel.price = 0.0;
      this.invoicedel.taxr = "17%";
      this.invoicedel.amount = 0.0;
      this.invoicedel.taxAmount= "";
    }
  }

  openInvoicedelServiceInfo (){
    this.navCtrl.push(InvoicedelServiceInfoPage);
  }

  //单价 数量焦点离开自动计算金额
  alterAmount (){
    if(!this.appUtil.isNull(this.invoicedel.size) && (!this.appUtil.isNull(this.invoicedel.price) || !this.appUtil.isNull(this.invoicedel.amount))){
      //单价不空时
      if(!this.appUtil.isNull(this.invoicedel.price) && this.invoicedel.price != 0){
        if(!isNaN(this.invoicedel.size) && !isNaN(this.invoicedel.price)){
          let taxAmount = this.invoicedel.size * (this.invoicedel.price / (1 + (parseInt(this.invoicedel.taxr.substring(0,this.invoicedel.taxr.length - 1)) / 100))) * (parseInt(this.invoicedel.taxr.substring(0,this.invoicedel.taxr.length - 1)) / 100);
          this.invoicedel.taxAmount = taxAmount.toFixed(2);
          this.invoicedel.amount = (this.invoicedel.size * this.invoicedel.price);
        }else{
          this.appIonicUtil.toast('数量或单价必须为数字！');
        }
        //总价不空时
      }else if(!this.appUtil.isNull(this.invoicedel.amount)){
        if(!isNaN(this.invoicedel.size) && !isNaN(this.invoicedel.amount)){
          let _taxAmount = this.invoicedel.amount/(1 + (parseInt(this.invoicedel.taxr.substring(0,this.invoicedel.taxr.length - 1)) / 100)) * (parseInt(this.invoicedel.taxr.substring(0,this.invoicedel.taxr.length - 1)) / 100);
          this.invoicedel.taxAmount = _taxAmount.toFixed(2);
          this.invoicedel.price = 0;
        }else{
          this.appIonicUtil.toast('数量或总价必须为数字！');
        }
      }
    }
  }

  subInvoicedel (){
    try{
      if(this.appUtil.isNull(this.invoicedel.serviceName)){
        this.appIonicUtil.toast('请输入货物或应税劳务！');
        return;
      }
      if(this.appUtil.isNull(this.invoicedel.unitInfo)){
        this.appIonicUtil.toast('请输入计量单位！');
        return;
      }
      if(this.appUtil.isNull(this.invoicedel.size)){
        this.appIonicUtil.toast('请输入数量！');
        return;
      }
      if(this.appUtil.isNull(this.invoicedel.amount)){
        this.appIonicUtil.toast('请输入金额(含税)！');
        return;
      }
      if(this.appUtil.isNull(this.invoicedel.taxr)){
        this.appIonicUtil.toast('请输入税率！');
        return;
      }
      if(this.appUtil.isNull(this.invoicedel.taxAmount)){
        this.appIonicUtil.toast('请输入税额！');
        return;
      }

      var idel = {
        serviceName : this.invoicedel.serviceName,
        amount : this.invoicedel.amount,
        taxAmount : this.invoicedel.taxAmount,
        typeInfo : this.invoicedel.typeInfo,
        unitInfo : this.invoicedel.unitInfo,
        size : this.invoicedel.size,
        price : this.invoicedel.price,
        taxr : this.invoicedel.taxr
      };

      if(this.isEdit == 0){
        this.invoice.invoicedelVoList.push(idel);
        this.reCalcAmount();
        this.appIonicUtil.toast('添加成功！');
      }else{
        this.invoice.invoicedelVoList[this.editIndex] = idel;
        this.reCalcAmount();
        this.appIonicUtil.toast('修改成功！');
      }
      this.navCtrl.pop();

    }catch (e){
      console.error(e);
    }
  }

  reCalcAmount (){
    this.invoice.totalAmount = 0;
    this.invoice.totalTaxAmount = 0;
    for(var i=0; i < this.invoice.invoicedelVoList.length; i++){
      this.invoice.totalAmount += parseFloat(this.invoice.invoicedelVoList[i].amount);
      this.invoice.totalTaxAmount += parseFloat(this.invoice.invoicedelVoList[i].taxAmount);
    }
    this.invoice.totalAmount = parseFloat(this.invoice.totalAmount.toFixed(2));
    this.invoice.totalTaxAmount = parseFloat(this.invoice.totalTaxAmount.toFixed(2));
  }

  clearKpmx (){
        this.alertCtrl.create({
          title: '提示',
          message: '确认清空？',
          buttons: [
            {
              text: '是',
              handler: () => {            
                this.invoicedel.serviceName = "";
                this.invoicedel.amount = 0.0;
                this.invoicedel.taxAmount = "";
                this.invoicedel.typeInfo = "";
                this.invoicedel.unitInfo = "";
                this.invoicedel.price = 0.0;
                this.invoicedel.taxr = "17%";
                this.invoicedel.size = 0;
                this.appIonicUtil.toast('清空成功！');
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





}
