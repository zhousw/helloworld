import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule,JsonpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/Home/home';
import { ClientListPage } from '..//pages/client-List/client-List';
import { LoginPage } from '../pages/login/login';
import { PwdPage } from '../pages/pwd/pwd';
import { SetServerPathPage } from '../pages/set-server-path/set-server-path';
import { InvoiceFormPage } from '../pages/invoice-form/invoice-form';
import { InvoiceListPage } from '../pages/invoice-list/invoice-list';
import { XsClientPage } from '../pages/xs-client/xs-client';
import { ClientPage } from "../pages/client/client";
import { ImgUploadPage } from "../pages/img-upload/img-upload";
import { InvoicedelPage } from "../pages/invoicedel/invoicedel";
import { ImgHwUploadPage } from "../pages/img-hw-upload/img-hw-upload";
import { InvoicedelServiceInfoPage } from "../pages/invoicedel-service-info/invoicedel-service-info";
import { AddressPage } from "../pages/address/address";
import { ClientDetailPage } from "../pages/client-detail/client-detail";
import { AddressListPage } from "../pages/address-list/address-list";
import { ClientFormPage } from "../pages/client-form/client-form";
import { AddressFormPage } from "../pages/address-form/address-form";
import { AddressDetailPage } from "../pages/address-detail/address-detail";
import { MessagePage } from "../pages/message/message";
import { InvoiceDetailPage } from "../pages/invoice-detail/invoice-detail";
import { InvoiceCkPage } from "../pages/invoice-ck/invoice-ck";
import { InvoiceZfPage } from "../pages/invoice-zf/invoice-zf";
import { FastMailPage } from "../pages/fast-mail/fast-mail";

import { LoginServiceProvider } from '../Providers/login-service/login-service';
import { InvoiceServiceProvider } from "../Providers/invoice-service/invoice-service";
import { HttpService } from '../Providers/HttpService';
import { AppIonicUtil } from '../app/app.ionic.util';
import { AppUtil } from "../app/app.util";
import { HomeServiceProvider } from '../Providers/home-service/home-service';
import { FileTransfer,FileTransferObject} from '@ionic-native/file-transfer';
import { File } from "@ionic-native/file";
import { FileOpener} from '@ionic-native/file-opener';
import { AppVersion } from "@ionic-native/app-version";
import { Network } from "@ionic-native/network";
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera } from '@ionic-native/camera';
import { ClientServiceProvider } from '../Providers/client-service/client-service';
import { AddressServiceProvider } from '../Providers/address-service/address-service';
import { TabServiceProvider } from '../Providers/tab-service/tab-service';
import { PwdServiceProvider } from '../Providers/pwd-service/pwd-service';
//import { JPushServiceProvider } from '../Providers/j-push-service/j-push-service';
import { JPush } from 'ionic3-jpush';
import { Push } from '@ionic-native/push';
import { AppServiceProvider } from '../Providers/app-service/app-service';
import { BackButtonServiceProvider } from '../Providers/back-button-service/back-button-service';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    HomePage,
    ClientListPage,
    LoginPage,
    PwdPage,
    SetServerPathPage,
    InvoiceFormPage,
    InvoiceListPage,
    XsClientPage,
    ClientPage,
    ImgUploadPage,
    InvoicedelPage,
    ImgHwUploadPage,
    InvoicedelServiceInfoPage,
    AddressPage,
    ClientDetailPage,
    AddressListPage,
    ClientFormPage,
    AddressFormPage,
    AddressDetailPage,
    MessagePage,
    InvoiceDetailPage,
    InvoiceCkPage,
    InvoiceZfPage,
    FastMailPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp,{backButtonText: '返回'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    HomePage,
    ClientListPage,
    LoginPage,
    PwdPage,
    SetServerPathPage,
    InvoiceFormPage,
    InvoiceListPage,
    XsClientPage,
    ClientPage,
    ImgUploadPage,
    InvoicedelPage,
    ImgHwUploadPage,
    InvoicedelServiceInfoPage,
    AddressPage,
    ClientDetailPage,
    AddressListPage,
    ClientFormPage,
    AddressFormPage,
    AddressDetailPage,
    MessagePage,
    InvoiceDetailPage,
    InvoiceCkPage,
    InvoiceZfPage,
    FastMailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginServiceProvider,
    InvoiceServiceProvider,
    HttpService,
    AppIonicUtil,
    AppUtil,
    HomeServiceProvider,
    FileTransfer,
    FileTransferObject,
    File,
    FileOpener,
    AppVersion,
    Network,
    ImagePicker,
    Camera,
    ClientServiceProvider,
    AddressServiceProvider,
    TabServiceProvider,
    PwdServiceProvider,
    //JPushServiceProvider,
    JPush,
    Push,
    AppServiceProvider,
    BackButtonServiceProvider,

  ]
})
export class AppModule {}

