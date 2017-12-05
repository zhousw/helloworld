import { Injectable } from '@angular/core';
import { AppConfig } from '../../app/app.config';
import { HttpService } from '../HttpService';
import { AppUtil } from '../../app/app.util';
@Injectable()
export class InvoiceServiceProvider {

   _isUpdate = 0 ;
  constructor(
    private httpService : HttpService,
    private appUtil     : AppUtil
  ) {
    console.log('Hello InvoiceServiceProvider Provider');
  }

  getCorporateVoByCcInfo (){
    return this.httpService.HttpPost(AppConfig.urlRoot + 'wXKPClientAction!getCorporateVoByCcInfo.shtml');
  }

   getCorporateVoListByConsult (index?,fieldName?,paramString?,type?){
       let hqlClause = '';
       if(!this.appUtil.isNull(paramString)){
       hqlClause = 'a.' + fieldName + ' like ?';
        paramString = '%' + paramString + '%';
       }
      return this.httpService.HttpPost(AppConfig.urlRoot + 'wXKPClientAction!getCorporateVoListByConsult.shtml',
              {'pageIndex': index,
                'hqlClause': hqlClause,
                'paramString': paramString,
                'domainFileType': type
              })
   }

   getWXKPClientListCount (wClientParams?,type?){
    let hqlClause = '';
    return this.httpService.HttpPost(AppConfig.urlRoot + 'wXKPClientAction!getWXKPClientListCount.shtml',
            {'wClientParams': wClientParams,
              'domainFileType': type
            })
  }

  getWXKPClientVoListByConsult (index?,wClientParams?,type?){
    return this.httpService.HttpPost(AppConfig.urlRoot + 'wXKPClientAction!getWXKPClientVoListByConsult.shtml',
            {'pageIndex': index,
              'wClientParams': wClientParams,
              'domainFileType': type
            })
  }

  getWXKPAddressVoByClientCorporate (id){
    return this.httpService.HttpPost(AppConfig.urlRoot + 'wXKPAdressAction!getWXKPAddressVoByClientCorporate.shtml',{
      'clientCorporate.id': id
    })
  }

  getWXKPAddressVoByClient (id){
    return this.httpService.HttpPost(AppConfig.urlRoot + 'wXKPAdressAction!getWXKPAddressVoByClient.shtml',{
      'wXKPClient.id': id
    })
  }
  
  save (invoice,signInType,infos){
    return this.httpService.HttpPost(AppConfig.urlRoot + 'wXKPInvoiceAction!save.shtml',{
        'wXKPInvoice.taxNum': invoice.taxNum,
        'wXKPInvoice.name': invoice.gname,
        'wXKPInvoice.address': invoice.address,
        'wXKPInvoice.phone': invoice.phone,
        'wXKPInvoice.bank': invoice.bank,
        'wXKPInvoice.account': invoice.account,
        'wXKPInvoice.taxNumxs': invoice.taxNumxs,
        'wXKPInvoice.namexs': invoice.namexs,
        'wXKPInvoice.addressxs': invoice.addressxs,
        'wXKPInvoice.phonexs': invoice.phonexs,
        'wXKPInvoice.bankxs': invoice.bankxs,
        'wXKPInvoice.accountxs': invoice.accountxs,
        'wXKPInvoice.addressConsignee': invoice.addressConsignee,
        'wXKPInvoice.addressPhone': invoice.addressPhone,
        'wXKPInvoice.addressAddress': invoice.addressAddress,
        'wXKPInvoice.addressGsName': invoice.addressGsName,
        'wXKPInvoice.totalAmount': invoice.totalAmount,
        'wXKPInvoice.totalTaxAmount': invoice.totalTaxAmount,
        'wXKPInvoice.typeInfo': invoice.typeInfo,
        'wXKPInvoice.signInType': signInType,
        'wXKPInvoice.idea': invoice.idea,
        'infos': infos
    })
  }

  setIsUpdate (val){
    this._isUpdate = val;
  }

  getWXKPAddressVoListByClient (id){
      return this.httpService.HttpPost(AppConfig.urlRoot + 'wXKPAdressAction!getWXKPAddressVoListByClient.shtml',{
        'wXKPClient.id': id
      })
  }

  getWXKPInvoiceListCount (type,state,params){
    return this.httpService.HttpPost(AppConfig.urlRoot + 'wXKPInvoiceAction!getWXKPInvoiceListCount.shtml',{
      'domainFileType': type,
      'state': state,
      'params': params
    })
  }

  getWXKPInvoiceVoList (index,type,state,params){
    return this.httpService.HttpPost(AppConfig.urlRoot + 'wXKPInvoiceAction!getWXKPInvoiceVoList.shtml',{
      'pageIndex': index,
      'domainFileType': type,
      'state': state,
      'params': params
    })
  }

  getWXKPInvoiceVo (id){
    return this.httpService.HttpPost(AppConfig.urlRoot + 'wXKPInvoiceAction!getWXKPInvoiceVo.shtml',{
      'wXKPInvoice.id': id
    })
  }

  getUploadFileListInfo (id){
    return this.httpService.HttpPost(AppConfig.urlRoot + 'wXKPInvoiceAction!getUploadFileListInfo.shtml',{
      'wXKPInvoice.id': id
    })
  }

  saveQR (id){
    return this.httpService.HttpPost(AppConfig.urlRoot + 'wXKPInvoiceAction!saveQR.shtml',{
      'wXKPInvoice.id': id
    })
  }

  saveSH (id){
    return this.httpService.HttpPost(AppConfig.urlRoot + 'wXKPInvoiceAction!saveSH.shtml',{
      'wXKPInvoice.id': id
    })
  }

  applyCK (id,info){
    return this.httpService.HttpPost(AppConfig.urlRoot + 'wXKPInvoiceAction!applyCK.shtml',{
      'wXKPInvoice.id': id,
      'descInfo': info
    })
  }

  applyZF (id,info){
    return this.httpService.HttpPost(AppConfig.urlRoot + 'wXKPInvoiceAction!applyZF.shtml',{
      'wXKPInvoice.id': id,
      'descInfo': info
    })
  }


}
