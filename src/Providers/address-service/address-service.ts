import { Injectable } from '@angular/core';
import { AppUtil } from '../../app/app.util';
import { HttpService } from "../HttpService";
import { AppConfig } from '../../app/app.config';

@Injectable()
export class AddressServiceProvider {

   _isUpdate = 0 ;
  constructor(
    private appUtil:AppUtil,
    private httpService:HttpService
  ) {
    console.log('Hello AddressServiceProvider Provider');
  }

  getWXKPAddressListCount (fieldName,paramString,type,clientId){
    var hqlClause = '';
    if(!this.appUtil.isNull(paramString)){
        hqlClause = 'a.' + fieldName + ' like ?';
        paramString = '%' + paramString + '%';
    }
    return this.httpService.HttpPost(AppConfig.urlRoot + 'wXKPAdressAction!getWXKPAddressListCount.shtml',{
        'hqlClause': hqlClause,
        'paramString': paramString,
        'domainFileType': type,
        'wXKPClientId': clientId
    })
  }

  getWXKPAddressVoList (index,fieldName,paramString,type,clientId){
    var hqlClause = '';
    if(!this.appUtil.isNull(paramString)){
        hqlClause = 'a.' + fieldName + ' like ?';
        paramString = '%' + paramString + '%';
    }
    return this.httpService.HttpPost(AppConfig.urlRoot + 'wXKPAdressAction!getWXKPAddressVoList.shtml',{
        'pageIndex': index,
        'hqlClause': hqlClause,
        'paramString': paramString,
        'domainFileType': type,
        'wXKPClientId': clientId
    })
  }

  getIsUpdate (){
    return this._isUpdate;
  }

  setIsUpdate (val){
    this._isUpdate = val;
  }

  deleteData (id){
    return this.httpService.HttpPost(AppConfig.urlRoot + 'wXKPAdressAction!deleteData.shtml',{
        'wXKPAddress.id': id
    })
  }

  getWXKPAddressVo (id){
    return this.httpService.HttpPost(AppConfig.urlRoot + 'wXKPAdressAction!getWXKPAddressVo.shtml',{
        'wXKPAddress.id': id
    })
  }

  save (id,clientId,consignee,phone,address,isDefault){
    return this.httpService.HttpPost(AppConfig.urlRoot + 'wXKPAdressAction!save.shtml',{
      'wXKPAddress.id': id,
      'wXKPAddress.wXKPClient.id': clientId,
      'wXKPAddress.consignee': consignee,
      'wXKPAddress.phone': phone,
      'wXKPAddress.address': address,
      'wXKPAddress.isDefault': isDefault
    })
  }


}
