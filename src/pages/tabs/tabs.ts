import { Component, ViewChild } from '@angular/core';
import { Nav} from 'ionic-angular';
import { HomePage } from '../Home/home';
import { ClientListPage } from '../client-List/client-List';
import { NavController ,Platform,Tabs } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { PwdPage } from '../pwd/pwd';
import { AppUtil } from '../../app/app.util';
import { TabServiceProvider } from "../../Providers/tab-service/tab-service";
import { BackButtonServiceProvider } from "../../Providers/back-button-service/back-button-service";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild(Nav) nav: Nav;
  @ViewChild('menuContent') tabRef: Tabs;
  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(
      private appUtil : AppUtil,
      private navCtrl: NavController,
      private tabService:TabServiceProvider,
      private backButtonService:BackButtonServiceProvider,
      private platform:Platform
  ) {
     this.pages = [
      { title: '主页', component: HomePage },
      { title: '客户名单', component: ClientListPage },
      { title: '修改密码', component: PwdPage }
    ];
    
    platform.ready().then(() => {
      this.backButtonService.registerBackButtonAction(this.tabRef);
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  outLogin (){
    try{
      this.tabService.outLogin();
      window.localStorage.removeItem('ccInfo');

      this.appUtil.setObjInfoNull();
      //this.jPushPlugin.setAlias('');  //清除jpush Alias
      this.navCtrl.setRoot(LoginPage);
    }catch (e){
      console.error(e)
    }
  }



}
