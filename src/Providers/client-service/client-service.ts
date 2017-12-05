import { Injectable } from '@angular/core';
import { AppUtil } from "../../app/app.util";
import { HttpService } from "../HttpService";
import { AppConfig } from '../../app/app.config';

@Injectable()
export class ClientServiceProvider {

  _isUpdate = 0 ;
  constructor(
    private appUtil:AppUtil,
    private httpService:HttpService
  ) {
    console.log('Hello ClientServiceProvider Provider');
  }

  getWXKPClientListCount (fieldName,paramString,type){
      let hqlClause = '';
      if(!this.appUtil.isNull(paramString)){
          hqlClause = 'a.' + fieldName + ' like ?';
          paramString = '%' + paramString + '%';
      }
      return this.httpService.HttpPost(AppConfig.urlRoot + 'wXKPClientAction!getWXKPClientListCount.shtml',{
          'hqlClause': hqlClause,
          'paramString': paramString,
          'domainFileType': type
      })
  }

  getWXKPClientVoList (index,fieldName,paramString,type){
    let hqlClause = '';
    if(!this.appUtil.isNull(paramString)){
        hqlClause = 'a.' + fieldName + ' like ?';
        paramString = '%' + paramString + '%';
    }
    return this.httpService.HttpPost(AppConfig.urlRoot + 'wXKPClientAction!getWXKPClientVoList.shtml',{
        'pageIndex': index,
        'hqlClause': hqlClause,
        'paramString': paramString,
        'domainFileType': type
    })
  }

  getWXKPClientVo (id){
    return this.httpService.HttpPost(AppConfig.urlRoot + 'wXKPClientAction!getWXKPClientVo.shtml',{
        'wXKPClient.id': id
    })
  }

  deleteData (id){
    return this.httpService.HttpPost(AppConfig.urlRoot + 'wXKPClientAction!deleteData.shtml',{
        'wXKPClient.id': id
    })
  }

  save (id,taxNum,name,address,phone,bank,account){
    return this.httpService.HttpPost(AppConfig.urlRoot + 'wXKPClientAction!save.shtml',{
      'wXKPClient.id': id,
      'wXKPClient.taxNum': taxNum,
      'wXKPClient.name': name,
      'wXKPClient.address': address,
      'wXKPClient.phone': phone,
      'wXKPClient.bank': bank,
      'wXKPClient.account': account
    })
  }

  setIsUpdate (val){
    this._isUpdate = val;
  }


}
