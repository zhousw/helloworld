import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { Invoice } from '../../Model/invoice';
import { InvoiceServiceProvider } from "../../Providers/invoice-service/invoice-service";
import { XsClientPage } from '../xs-client/xs-client';
import { ClientPage } from "../client/client";
import { AppIonicUtil } from "../../app/app.ionic.util";
import { AppUtil } from "../../app/app.util";
import { ImgUploadPage } from "../img-upload/img-upload";
import { InvoicedelPage } from "../../pages/invoicedel/invoicedel";
import { ImgHwUploadPage } from "../img-hw-upload/img-hw-upload";
import { AddressPage } from "../address/address";
//import * as $ from "jquery";
import * as angular from "angular";
import { AppConfig } from '../../app/app.config';
import { FileTransfer,FileTransferObject,FileUploadOptions} from '@ionic-native/file-transfer';
import { ImgBean } from "../../Model/image";
import { Invoicedel } from "../../Model/invoicedel";

@IonicPage()
@Component({
  selector: 'page-invoice-form',
  templateUrl: 'invoice-form.html',
})
export class InvoiceFormPage{
  title:"申请开票"
  invoicedel = Invoicedel;
  isEdit = 0; //是否编辑
  editIndex = 0; //编辑index
  signInType = {
    value : '0'
  };
  imgSrcs = ImgBean.imgSrcs;
  imgHwSrcs = ImgBean.imgHwSrcs;
  public invoice = Invoice
  constructor(
    public navCtrl: NavController,
    public alertCtrl:AlertController,
    public loadCtrl:LoadingController, 
    public navParams: NavParams,
    private invoiceService:InvoiceServiceProvider,
    private appIonicUtil:AppIonicUtil,
    private appUtil:AppUtil,
    private fileTransfer: FileTransfer,
  ) {
    this.invoicedel.taxr = '17%';
    this.isEdit = 0;
    
    this.initData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoiceFormPage');
  }

  addInvoicedel(){
    this.navCtrl.push(InvoicedelPage);
  };

  openHwImgUpload (){
      this.navCtrl.push(ImgHwUploadPage);
  }

  delImgSrcs (index){
    this.alertCtrl.create({
      title: '提示',
      message: '<span class="rem-3">确认删除？</span>',
      buttons: [
        {
          text: '是',
          handler: () => {            
            ImgBean.imgSrcs.splice(index,1);
            this.appIonicUtil.toast('删除成功！');
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

  initData (){
    try{
      let loading = this.appIonicUtil.loading("加载中···");
      this.invoice.typeInfo = '0';   //默认专用发票
      this.invoice.totalAmount = 0;  //子发票 票面总金额
      this.invoice.totalTaxAmount = 0;   //子发票 票面总税额
      this.invoiceService.getCorporateVoByCcInfo()
      .then(res=>{
        if(res.isSuccess){
          this.invoice.corporateId = res.Data.id;
          this.invoice.taxNumxs = res.Data.taxNum;
          this.invoice.namexs = res.Data.name;
          this.invoice.addressxs = res.Data.address;
          this.invoice.phonexs = res.Data.phone;
          this.invoice.bankxs = res.Data.bank;
          this.invoice.accountxs = res.Data.account;
        }
      });
      loading.dismiss();
    }catch (e){
      console.error(e);
    }
  }

  custNameChg(){
    if(this.signInType.value == '1'){
      this.invoice.addressGsName = this.invoice.gname;
    }else if(this.signInType.value == '2'){
      this.invoice.addressGsName = this.invoice.namexs;
    }
  }

  onblursKH (){
    if(this.invoice.gname == "" || this.invoice.gname==null){
      this.invoice.taxNum = "";
      this.invoice.address = "";
      this.invoice.phone = "";
      this.invoice.bank = "";
      this.invoice.account = "";
    }
  }

  onblursCheck(){
    try {
      if (this.invoice.taxNum.length != 0 && this.invoice.taxNum.length != 15 && this.invoice.taxNum.length != 18 && this.invoice.taxNum.length != 20) {
        //this.invoice.taxNum = "";
        //alert('纳税人识别号长度应为15、18或20位');
        let oInput = document.getElementById("strName");
        oInput.focus();
        this.appIonicUtil.toast('纳税人识别号长度应为15、18或20位');
      }
    }catch(e){
      console.error(e);
    }
  }

  openXSClientConsult (){
    this.navCtrl.push(XsClientPage);
  };
  
  openClientConsult (){
    this.navCtrl.push(ClientPage);
  };

  openImgUpload (){
    this.navCtrl.push(ImgUploadPage);
  }

  alterSignInType (index){
    try{
      if(index == '1'){
        this.signInType.value = '1';
        if(this.invoice.wXKPClientId != 0){
          this.invoiceService.getWXKPAddressVoByClient(this.invoice.wXKPClientId).then(res=>{
              if(res.isSuccess && !this.appUtil.isNull(res.Data) ){
                this.invoice.addressConsignee = res.Data.consignee;
                this.invoice.addressPhone = res.Data.phone;
                this.invoice.addressAddress = res.Data.address;
                this.invoice.addressGsName = this.invoice.gname;
              }else{
                this.invoice.addressConsignee = '';
                this.invoice.addressPhone = '';
                this.invoice.addressAddress = '';
                this.invoice.addressGsName = '';
              }
          });
        }else{
          this.invoice.addressConsignee = '';
          this.invoice.addressPhone = '';
          this.invoice.addressAddress = '';
          this.invoice.addressGsName = this.invoice.gname;
        }
      }else if(index == '2'){
        this.signInType.value = '2';
        if(this.invoice.corporateId != 0){
          this.invoiceService.getWXKPAddressVoByClientCorporate(this.invoice.corporateId).then(res=>{
              if(res.isSuccess && !this.appUtil.isNull(res.Data) ){
                this.invoice.addressConsignee = res.Data.consignee;
                this.invoice.addressPhone = res.Data.phone;
                this.invoice.addressAddress = res.Data.address;
                this.invoice.addressGsName = this.invoice.namexs;
              }else{
                this.invoice.addressConsignee = '';
                this.invoice.addressPhone = '';
                this.invoice.addressAddress = '';
                this.invoice.addressGsName = '';
              }
          });
        }else{
          this.invoice.addressConsignee = '';
          this.invoice.addressPhone = '';
          this.invoice.addressAddress = '';
          this.invoice.addressGsName = this.invoice.namexs;
        }
      }else{
        this.signInType.value = '0';
        this.invoice.addressConsignee = '';
        this.invoice.addressPhone = '';
        this.invoice.addressAddress = '';
        this.invoice.addressGsName = '';
      }
    }catch (e){
      console.error(e);
    }
  };

  delHwImgSrcs (index){
    this.alertCtrl.create({
      title: '提示',
      message: '<span class="rem-3">确认删除？</span>',
      buttons: [
        {
          text: '是',
          handler: () => {            
            ImgBean.imgHwSrcs.splice(index,1);
            this.appIonicUtil.toast('删除成功！');
          }
        },
        {
          text: '否',
          handler: () => {            
              console.log('否');
          }
        }
      ]
    }).present()
  }

  //提交项目信息
  subFData (){
    try{
      if(ImgBean.imgSrcs.length == 0) {
        if (this.invoice.typeInfo == '1') {
          if (this.appUtil.isNull(this.invoice.gname)) {
            this.appIonicUtil.toast('请输入购买方客户名称！');
            return;
          }
          if (this.appUtil.isNull(this.invoice.addressConsignee) && this.signInType.value != '0') {
            this.appIonicUtil.toast('请输入收件人！');
            return;
          }
          if (this.appUtil.isNull(this.invoice.addressPhone) && this.signInType.value != '0') {
            this.appIonicUtil.toast('请输入联系电话！');
            return;
          }
          if (this.appUtil.isNull(this.invoice.addressAddress) && this.signInType.value != '0') {
            this.appIonicUtil.toast('请输入地址！');
            return;
          }

        } else {
          if (this.appUtil.isNull(this.invoice.gname)) {
            this.appIonicUtil.toast('请输入购买方客户名称！');
            return;
          }
          if (this.appUtil.isNull(this.invoice.addressConsignee) && this.signInType.value != '0') {
            this.appIonicUtil.toast('请输入收件人！');
            return;
          }
          if (this.appUtil.isNull(this.invoice.addressPhone) && this.signInType.value != '0') {
            this.appIonicUtil.toast('请输入联系电话！');
            return;
          }
          if (this.appUtil.isNull(this.invoice.addressAddress) && this.signInType.value != '0') {
            this.appIonicUtil.toast('请输入地址！');
            return;
          }

        }
      }

        if(this.invoice.invoicedelVoList.length == 0 && ImgBean.imgHwSrcs.length <= 0){
          this.appIonicUtil.toast('请添加明细信息！');
          return;
        }

      if(this.appUtil.isNull(this.invoice.namexs)){
        this.appIonicUtil.toast('请输入销售方客户名称！');
        return;
      }
      if(this.appUtil.isNull(this.invoice.taxNumxs)){
        this.appIonicUtil.toast('请输入销售方纳税人识别号！');
        return;
      }

      // sleep(numberMillis) {
      //   let now = new Date();
      //   let exitTime = now.getTime() + numberMillis;
      //   while (true) {
      //     now = new Date();
      //     if (now.getTime() > exitTime)
      //       return;
      //   }
      // }
      this.alertCtrl.create({
        title: '提示',
        message: "确认提交？",
        buttons: [
          {
            text: '是',
            handler: (res) => {            
                let infos = '';
                let arrs = [];
                for(let i=0;i<this.invoice.invoicedelVoList.length;i++){
                  let typeInfoTemp = ' ';
                  if(!this.appUtil.isNull(this.invoice.invoicedelVoList[i].typeInfo)){
                    typeInfoTemp = this.invoice.invoicedelVoList[i].typeInfo;
                  }
                  let info = '|||' + this.invoice.invoicedelVoList[i].serviceName + '||'
                    +  typeInfoTemp + '||'
                    +  this.invoice.invoicedelVoList[i].unitInfo + '||'
                    +  this.invoice.invoicedelVoList[i].size + '||'
                    +  this.invoice.invoicedelVoList[i].price + '||'
                    +  this.invoice.invoicedelVoList[i].amount + '||'
                    +  this.invoice.invoicedelVoList[i].taxr + '||'
                    +  this.invoice.invoicedelVoList[i].taxAmount ;
                  infos += info;
                  arrs.push(this.invoice.invoicedelVoList[i]);
                }
                if(infos != ''){
                  infos = infos.substring(3);
                }
                this.invoiceService.save(this.invoice,this.signInType.value,infos).then(res=>{
                    if(res.isSuccess){
                      let lengths = ImgBean.imgSrcs.length;
                      let hwlengths = ImgBean.imgHwSrcs.length;
        
                      let sumlengths = lengths + hwlengths;
                      let sumImgSrcs = [];
                      for(let i = 0;i<lengths;i++){
                        sumImgSrcs[i] = ImgBean.imgSrcs[i];
                      }
                      for(let i = lengths ; i < sumlengths ; i++){
                        sumImgSrcs[i] = ImgBean.imgHwSrcs[i-lengths];
                      }
                      let loading=this.loadCtrl.create({
                        content: '正在上传中···'
                      });
                      if(sumlengths > 0) {
                          for (let i = 0; i < sumlengths; i++) {
                            loading.present();
                            const fileTransfer: FileTransferObject = this.fileTransfer.create();
                            let options: FileUploadOptions = {
                              fileKey: 'file',
                              fileName: '123.jpg',  // 文件类型
                              mimeType: 'image/jpeg',
                              params: {
                                'wXKPInvoice.id': res.Data
                              }    
                            }
                            fileTransfer.upload(sumImgSrcs[i],AppConfig.urlRoot + 'wXKPInvoiceAction!fileUpload.shtml;jsessionid=' + AppConfig.sessionId,options)
                              .then((result)=> {
                                sumlengths = sumlengths - 1;
                                if (sumlengths <= 0) {
                                  loading.dismiss();
                                  this.setInvoicedelServiceInfo(arrs);
                                  this.invoiceService.setIsUpdate(1);
                                  this.appIonicUtil.toast('提交成功！');
                                  this.navCtrl.pop();
                                }
                              }, function (progress) {
                                //进度，这里使用文字显示下载百分比
                                  let downloadProgress = (progress.loaded / progress.total) * 100;
                                  this.loadCtrl.create({
                                    noBackdrop: true,
                                    template: "上传中：" + Math.floor(downloadProgress) + "%"
                                  });
                                  if (downloadProgress > 99) {
                                    loading.dismiss();
                                  }
                               }
                              ).catch((err) => {
                                console.log(err)
                                this.appIonicUtil.toast(err);
                                loading.dismiss();
                               })
                          }
                      }else{
                        this.setInvoicedelServiceInfo(arrs);
                        this.appIonicUtil.toast('提交成功！');
                        this.invoiceService.setIsUpdate(1);
                        ImgBean.imgHwSrcs=[];//清空img值
                        ImgBean.imgSrcs=[];
                        loading.present();        
                        this.navCtrl.pop();
                      }
                    }else{
                      this.appIonicUtil.toast(res.desc);
                    }
                  }
                ).catch((err)=>{
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

  setInvoicedelServiceInfo (arrs){
    let json = window.localStorage.getItem('invoicedelInfo');
    let invoicedelInfo = new Array();
    if(!this.appUtil.isNull(json)){
      invoicedelInfo = angular.fromJson(json);
    }
    for(let i=0; i<arrs.length; i++){
      for(let j=0; j<invoicedelInfo.length; j++){
        if(invoicedelInfo[j].serviceName == arrs[i].serviceName){
          invoicedelInfo.splice(j,1);
        }
      }
    }
    for(let k=0; k<arrs.length; k++){
      invoicedelInfo.push(arrs[k]);
    }
    window.localStorage.setItem('invoicedelInfo',angular.toJson(invoicedelInfo))
  }

  editInvoicedelVo (index){
      this.isEdit = 1;
      this.editIndex = index;
      this.invoicedel.serviceName = this.invoice.invoicedelVoList[this.editIndex].serviceName,
      this.invoicedel.amount = this.invoice.invoicedelVoList[this.editIndex].amount,
      this.invoicedel.taxAmount = this.invoice.invoicedelVoList[this.editIndex].taxAmount,
      this.invoicedel.typeInfo = this.invoice.invoicedelVoList[this.editIndex].typeInfo,
      this.invoicedel.unitInfo = this.invoice.invoicedelVoList[this.editIndex].unitInfo,
      this.invoicedel.size = this.invoice.invoicedelVoList[this.editIndex].size,
      this.invoicedel.price = this.invoice.invoicedelVoList[this.editIndex].price,
      this.invoicedel.taxr = this.invoice.invoicedelVoList[this.editIndex].taxr

      this.navCtrl.push(InvoicedelPage,this.editIndex);
  };

  deleteInvoicedelVo (index){
    this.alertCtrl.create({
        title: '提示',
        message: '<span class="rem-3">确认删除？</span>',
        buttons: [
          {
            text: '是',
            handler: () => {            
              this.invoice.invoicedelVoList.splice(index,1);
              this.reCalcAmount();
              this.appIonicUtil.toast('删除成功！');
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

  openAddressConsult (){
    this.navCtrl.push(AddressPage);
  };




}
