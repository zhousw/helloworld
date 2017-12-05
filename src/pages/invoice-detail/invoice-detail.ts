import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AppIonicUtil } from "../../app/app.ionic.util";
import { InvoiceServiceProvider } from "../../Providers/invoice-service/invoice-service";
import { Invoice } from '../../Model/invoice';
import { AppUtil } from "../../app/app.util";
import { InvoiceCkPage } from '../invoice-ck/invoice-ck';
import { InvoiceZfPage } from '../invoice-zf/invoice-zf';
//import { HttpClient } from '@angular/common/http';
//import { Http,Headers ,RequestOptions,Jsonp } from '@angular/http';
import { InvoicedelPage } from '../invoicedel/invoicedel';
import { AppConfig } from '../../app/app.config';
import { FastMailPage } from '../fast-mail/fast-mail';
import * as $ from "jquery";
@IonicPage()
@Component({
  selector: 'page-invoice-detail',
  templateUrl: 'invoice-detail.html',
})
export class InvoiceDetailPage {

  id : number;
  title = '发票详情';
  invoice = Invoice;  //发票
  invoicedel = {};
  rootPath = AppConfig.rootPath;
  fileList = [];  //附件list
  djsDateQR = {
    value:''
  }
  djsDateSH = {
    value:''
  }
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public appIonicUtil:AppIonicUtil,
    private invoiceService:InvoiceServiceProvider,
    private appUtil:AppUtil,
    public alertCtrl:AlertController,
    //private httpClient:HttpClient,
    //private http:Http,
    //private jsonp:Jsonp
  ) {
    this.id = this.navParams.get('id');
    this.initData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoiceDetailPage');
  }

  checkTime (i)
  {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  initData (){
    try{
      let loading = this.appIonicUtil.loading('请求中···');
      this.invoiceService.getWXKPInvoiceVo(this.id).then(res =>{
          if(res.isSuccess){
            this.invoice = res.Data;
  
            if(this.invoice.state == '已开票'){
              let dateStr = this.appUtil.replaceAll(this.invoice.alterDate,'-',',');
              dateStr = this.appUtil.replaceAll(dateStr,' ',',');
              dateStr = this.appUtil.replaceAll(dateStr,':',',');
              let dates = dateStr.split(',');
              let aDate = new Date(dates[0],(parseInt(dates[1]) - 1),dates[2],dates[3],dates[4],dates[5]);
              let n = aDate.getTime() + 1 * 60 * 60 * 1000;
              let d = new Date(n);
              let timer1 = setInterval(() =>{
                  if(new Date() >= d){
                    clearInterval(timer1);
                    this.djsDateQR.value = "00小时00分00秒";
                    return;
                  }
                  let ts = (parseInt(d.toString())) - (parseInt((new Date()).toString()));//计算剩余的毫秒数
                  let dd = ts / 1000 / 60 / 60 / 24;//计算剩余的天数
                  let hh = ts / 1000 / 60 / 60 % 24;//计算剩余的小时数
                  let mm = ts / 1000 / 60 % 60;//计算剩余的分钟数
                  let ss = ts / 1000 % 60;//计算剩余的秒数
                  dd = this.checkTime(dd);
                  hh = this.checkTime(hh);
                  mm = this.checkTime(mm);
                  ss = this.checkTime(ss);
                  this.djsDateQR.value = hh + "小时" + mm + "分" + ss + "秒";
                }, 1000
              );
            }else if(this.invoice.state == '已快递'){
              let dateStr = this.appUtil.replaceAll(this.invoice.alterDate,'-',',');
              dateStr = this.appUtil.replaceAll(dateStr,' ',',');
              dateStr = this.appUtil.replaceAll(dateStr,':',',');
              let dates = dateStr.split(',');
              let aDate = new Date(dates[0],(parseInt(dates[1]) - 1),dates[2],dates[3],dates[4],dates[5]);
              let n = aDate.getTime() + 7 * 24 * 60 * 60 * 1000;
              let d = new Date(n);
              let timer2 = setInterval(() =>{
                  if(new Date() >= d){
                    clearInterval(timer2);
                    this.djsDateSH.value = "00天00小时00分00秒";
                    return;
                  }
                  let ts = (parseInt(d.toString())) - (parseInt((new Date()).toString()));//计算剩余的毫秒数
                  let dd = ts / 1000 / 60 / 60 / 24;//计算剩余的天数
                  let hh = ts / 1000 / 60 / 60 % 24;//计算剩余的小时数
                  let mm = ts / 1000 / 60 % 60;//计算剩余的分钟数
                  let ss = ts / 1000 % 60;//计算剩余的秒数
                  dd = this.checkTime(dd);
                  hh = this.checkTime(hh);
                  mm = this.checkTime(mm);
                  ss = this.checkTime(ss);
                  this.djsDateSH.value = dd + "天" + hh + "小时" + mm + "分" + ss + "秒";
                }, 1000
              );
            }
  
          }else{
            this.appIonicUtil.toast('数据读取失败！');
          }
        }).catch(() =>{
            this.appIonicUtil.toast('数据读取失败！');
        })

        this.invoiceService.getUploadFileListInfo(this.id).then(res =>{
          if(res.isSuccess){
            this.fileList = res.Data;
          }else{
            this.appIonicUtil.toast('数据读取失败！');
          }
        }).catch(()=>{
          this.appIonicUtil.toast('数据读取失败！');
        })
        loading.dismiss();
      }catch (e){
        console.error(e);
      }
    };

    openInvoiceCkModal(){
      this.navCtrl.push(InvoiceCkPage);
    }

    openInvoiceZfModal(){
      this.navCtrl.push(InvoiceZfPage);
    }

  //确认发票
  subFQR (){
    this.alertCtrl.create({
      title: '提示',
      message: '<span class="rem-3">确认提交？</span>',
      buttons: [
        {
          text: '是',
          handler: () => {            
            this.invoiceService.saveQR(this.invoice.id).then(res=>{
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
                  console.log('否');
              }
              }
            ]
        }).present();
      };

      //确认收件
    subFSH (){
      this.alertCtrl.create({
        title: '提示',
        message: '<span class="rem-3">确认提交？</span>',
        buttons: [
          {
            text: '是',
            handler: () => {            
              this.invoiceService.saveSH(this.invoice.id).then(res =>{
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
                    console.log('否');
                }
              }
            ]
        }).present();
      };

      //快递查询
     fastMailCheck () {
        let fastMailNumber = this.invoice.expressNum;
        let fastMails
        $.ajax({
          url: "http://www.kuaidi100.com/autonumber/autoComNum?text=" + fastMailNumber,
          type: 'GET',
          dataType: 'JSONP',//here
          success:  (data) => {
            fastMails = data.auto;
            let fastMailType = fastMails[0].comCode;
            let fastMailUrl = 'http://m.kuaidi100.com/index_all.html?type=' + fastMailType + '&postid=' + fastMailNumber;
            this.appUtil.setFastMailUrl(fastMailUrl);
            this.navCtrl.push(FastMailPage,{type:fastMailType,postid:fastMailNumber});
          },
          error : ()=>{
            this.appIonicUtil.toast('请求错误！');
          }
        });
        //  用下面这个出现跨域问题！
        //  this.http.get("http://www.kuaidi100.com/autonumber/autoComNum?text=" + fastMailNumber,'json_callback: JSON_CALLBACK')
        //  .toPromise()        
        //  .then((res) =>{
        //          alert(res)
        //  }).catch(() =>{
        //   this.appIonicUtil.toast('出现错误！');
        //  })
      }

      lookInvoicedel (index){
          let idel = {
            serviceName : this.invoice.invoicedelList[index].serviceName,
            amount : this.invoice.invoicedelList[index].amount,
            taxAmount : this.invoice.invoicedelList[index].taxAmount,
            typeInfo : this.invoice.invoicedelList[index].typeInfo,
            unitInfo : this.invoice.invoicedelList[index].unitInfo,
            size : this.invoice.invoicedelList[index].size,
            price : this.invoice.invoicedelList[index].price,
            taxr : this.invoice.invoicedelList[index].taxr
          };
          this.invoicedel = idel;
          console.log('idel:'+idel);
          this.navCtrl.push(InvoicedelPage,{invoicedel:this.invoicedel});
      };

    // openPS (index){
    //   let items = [];
    //   $('#galleryFP a').each(() =>{
    //       let size = $(this).attr('data-size').split("x");
    //       let item = {
    //         src: $(this).attr('data-href'),
    //         w: parseInt(size[0], 10),
    //         h: parseInt(size[1], 10),
            
    //       };
    //       item.el = $(this)[0];
    //       if($(this).children().length > 0){
    //         item.msrc = $(this).children().eq(0).attr('src');
    //         if($(this).children().length > 1) {
    //           item.title = $(this).children().eq(1).html();
    //         }
    //       }
    //       item.o = {
    //         src: item.src,
    //         w: item.w,
    //         h: item.h
    //       };
    //       items.push(item);
        
    //   });
    //   let options = {
    //     addCaptionHTMLFn: function(item, captionEl, isFake) {
    //       if(!item.title) {
    //         captionEl.children[0].innerText = '';
    //         return false;
    //       }
    //       captionEl.children[0].innerHTML = item.title ;
    //       return true;
    //     },
    //     index: index,
    //     history: false,
    //     shareEl: false,
    //     fullscreenEl: false
    //   };
    //   options.mainClass = 'pswp--minimal--dark';
    //   options.barsSize = {top:0,bottom:0};
    //   options.captionEl = false;
    //   options.bgOpacity = 0.7;
    //   options.tapToClose = true;
    //   options.tapToToggleControls = false;
  
    //   gallery = new PhotoSwipe( document.querySelectorAll('.pswp')[0], PhotoSwipeUI_Default, items, options);
    //   gallery.init();
  
    // }



}
