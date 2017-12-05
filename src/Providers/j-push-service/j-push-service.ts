
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';  
import { JPush } from 'ionic3-jpush';
//import { AppConfig } from "../../app/app.config";
//import * as angular from 'angular';

@Injectable()
export class JPushServiceProvider {

  constructor(
    private platform:Platform,
    public jPush:JPush,
    //public alertCtrl:AlertController
  ) {
    console.log('Hello JPushServiceProvider Provider');
  }

    setTags(tags) {
      this.platform.ready().then(()=>{
        this.jPush.setTags(tags)
        .catch(()=>{
          console.log('setTags 失败!');
        })
      })
    }

  setAlias(alias) {
    this.platform.ready().then(()=>{
            this.jPush.setAlias(alias)
            .catch(()=>{
              console.log('setAlias 失败!');
            })
    })
  }

  setApplicationIconBadgeNumber(badgeNumber){
    this.platform.ready().then(()=>{
      this.jPush.setApplicationIconBadgeNumber(badgeNumber)
      .catch(()=>{
        console.log('setApplicationIconBadgeNumber 失败!');
      })
    })
  }

}
