import { Injectable } from '@angular/core';
import { Http ,Headers ,RequestOptions } from '@angular/http';
import { AppIonicUtil } from '../app/app.ionic.util';
import { AppUtil } from '../app/app.util';
import { AppConfig } from "../app//app.config";
import * as $ from "jquery"; 
@Injectable()
export class HttpService {
    constructor(
      public  http: Http,
      private appUtil : AppUtil,
      public appIonicUtil:AppIonicUtil,

    ) { }   
      
   HttpPost(url,requestBody?,Header?:Headers){
      if(this.appUtil.isNull(Header)){
        Header = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
      }
      if(!this.appUtil.isNull(AppConfig.sessionId)){
        url = url + ';jsessionid=' + AppConfig.sessionId;
      }
        
      return this.http.post(url,this.toBodyString(requestBody),new RequestOptions({headers: Header}))
        .toPromise()
        .then(res => this.handleSuccess(res.json())) 
        .catch(error => this.handleError(error))
      }

      private handleSuccess(result) {
        if (result && !result.isSuccess) {
          this.appIonicUtil.toast(result.desc);
        }
        return result;
      }
  
      private handleError(error: Response | any) {
        let desc = '请求失败';
        if (error.status == 0) {
          desc = '请求地址错误';
        }
        if (error.status == 400) {
          desc = '请求无效';
          console.log('请检查参数类型是否匹配');
        }
        if (error.status == 404) {
          desc = '请求资源不存在';
          console.error(desc+'，请检查路径是否正确');
        }
        console.log(error);
        this.appIonicUtil.toast(desc);
        return {success: false, desc: desc};
      }

       //http请求时对body数据的处理
       private  toBodyString(obj) {
        let ret = [];
        for (let key in obj) {
          key = encodeURIComponent($.trim(key));
          let values =$.trim(obj[key]);
          if (values && values.constructor == Array) {//数组
            let queryValues = [];
            for (let i = 0, len = values.length, value; i < len; i++) {
              value = values[i];
              queryValues.push(this.toQueryPair(key, value));
            }
            ret = ret.concat(queryValues);
          } else { //字符串
            ret.push(this.toQueryPair(key, values));
          }
        }
        return ret.join('&');
      }

      private  toQueryPair(key, value) {
        if (typeof value == 'undefined') {
          return key;
        }
        return key + '=' + encodeURIComponent(value === null ? '' : String(value));
      }
}