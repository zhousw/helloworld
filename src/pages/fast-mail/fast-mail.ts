import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser';
import { AppUtil } from "../../app/app.util";
@IonicPage()
@Component({
  selector: 'page-fast-mail',
  templateUrl: 'fast-mail.html',
})
export class FastMailPage {

  title = '快递查询';
  fastMailUrl;
  constructor(
    public navCtrl: NavController,
    private appUtil:AppUtil,
    private domSanitizer:DomSanitizer
  ) {
      this.fastMailUrl =this.domSanitizer.bypassSecurityTrustResourceUrl(appUtil.fastMailUrl);

      //this.targetUrl= sce.trustAsResourceUrl(fastMailUrl);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FastMailPage');
  }

}
