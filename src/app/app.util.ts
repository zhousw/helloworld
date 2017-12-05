import { AppConfig } from '../app/app.config';
import * as angular from 'angular';
import { Injectable } from '@angular/core';

@Injectable()
export class AppUtil{
    constructor(
    ){}
   
    public setObjInfo (obj){
        AppConfig.ccInfo.id = obj.id;  //id
        AppConfig.ccInfo.phone = obj.phone;  //手机号
        AppConfig.ccInfo.kper.id = obj.kperId;  //开票人id
        AppConfig.ccInfo.kper.name = obj.kperName;  //开票人名称
        AppConfig.ccInfo.ccNames = obj.ccNames;  //客户名称
        AppConfig.ccInfo.ccTaxNums = obj.ccTaxNums;  //税号
        AppConfig.sessionId = obj.sessionId;
      }
      
      public setObjInfoNull (){
        AppConfig.ccInfo.id = '';  //id
        AppConfig.ccInfo.phone = '';  //手机号
        AppConfig.ccInfo.kper.id = '';  //开票人id
        AppConfig.ccInfo.kper.name = '';  //开票人名称
        AppConfig.ccInfo.ccNames = '';  //客户名称
        AppConfig.ccInfo.ccTaxNums = '';  //税号
        AppConfig.sessionId = '';
      }
      
      public fastMailUrl;
      setFastMailUrl (fastMailUrl){
        this.fastMailUrl = fastMailUrl;
      }
      
      //判断是否为空
      public isNull (info){
          if(info == null || info == '' || angular.isUndefined(info)){
              return true;
          }else{
              return false;
          }
      };
      
      //日期格式化
      public dateFormat (dateObj,format){
          var o = {
              "M+" : dateObj.getMonth()+1, //month
              "d+" : dateObj.getDate(),    //day
              "h+" : dateObj.getHours(),   //hour
              "m+" : dateObj.getMinutes(), //minute
              "s+" : dateObj.getSeconds(), //second
              "q+" : Math.floor((dateObj.getMonth()+3)/3),  //quarter
              "S" : dateObj.getMilliseconds() //millisecond
          };
          if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
              (dateObj.getFullYear()+"").substr(4 - RegExp.$1.length));
          for(var k in o)if(new RegExp("("+ k +")").test(format))
              format = format.replace(RegExp.$1,
                  RegExp.$1.length==1 ? o[k] :
                      ("00"+ o[k]).substr((""+ o[k]).length));
          return format;
      };
      
      //字符串替换
      public replaceAll (str,s1,s2){
          return str.replace(new RegExp(s1,"gm"),s2);
      }
      
      //日期格式化中文
      public dateFormatByChinese (dateStr){
          var res = '';
          if(!this.isNull(dateStr)){
             var days = ['星期天','星期一','星期二','星期三','星期四','星期五','星期六'];
             var date = new Date(dateStr);
             var week = days[date.getDay()];
             var	strs = dateStr.split(' ');
             var temps;
             if(strs.length > 1){
                  temps = strs[0].split('-');
                 res = temps[0] + '年' + temps[1] + '月' + temps[2] + '日 ' + week + ' ' + strs[1];
             }else{
                 temps = strs[0].split('-');
                 res = temps[0] + '年' + temps[1] + '月' + temps[2] + '日 ' + week;
             }
         }
          return res;
      };

    
    
      
}