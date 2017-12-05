import { Injectable, } from '@angular/core';
import { AlertController,Platform,LoadingController } from "ionic-angular";
import { AppConfig } from '../../app/app.config';
import { File } from "@ionic-native/file";
import { FileTransfer,FileTransferObject} from '@ionic-native/file-transfer';
import { FileOpener} from '@ionic-native/file-opener';
import { HttpService } from "../HttpService";
import { AppVersion } from "@ionic-native/app-version";
import { AppUtil } from "../../app/app.util";
import { AppIonicUtil } from "../../app/app.ionic.util";
import * as $ from "jquery";
@Injectable()
export class AppServiceProvider {

  constructor(
    public alertCtrl:AlertController,
    public loadingCtrl:LoadingController,
    private platform:Platform,
    private file:File,
    private fileTransfer:FileTransfer,
    private fileOpener:FileOpener,
    private httpService:HttpService,
    private appVersion:AppVersion,
    private appUtil:AppUtil,
    private appIonicUtil:AppIonicUtil
  ) {
    console.log('Hello AppServiceProvider Provider');
  }

  checkVersion (){
    return this.httpService.HttpPost('http://' + AppConfig.installPackageIp + '/appVersionManager/admin/appManager!getNewVersionByKpHr.shtml',{
    })
  }

  //检查更新
  checkUpdate() {
    try{
        this.checkVersion().then(res=>{
            if(res.isSuccess){
                let serverAppVersion = res.Data.version; //从服务端获取最新版本
                if(!this.appUtil.isNull(serverAppVersion)){
                    //获取版本
                    this.appVersion.getVersionNumber().then(version=>{
                        //如果本地于服务端的APP版本不符合
                        if (version != serverAppVersion) {
                            this.showUpdateConfirm(res.Data.descInfo);
                        }
                    });
                }
            }
        },function(err){

        });
    }catch (e){
        console.error(e);
    }
}


  showUpdateConfirm(descInfo) {
    this.alertCtrl.create({
      title: '版本升级',
      message: descInfo,
      buttons: [
        {
          text: '升级',
          handler: () => {            
            let isAndroid = this.platform.is('android');
                if(isAndroid){
                  let loadingStart = this.loadingCtrl.create({
                    content: "开始下载",
                  });
                  loadingStart.present();

                    let url = AppConfig.installPackageAddr; //可以从服务端获取更新APP的路径
                    let targetPath = this.file.externalRootDirectory + "apa7kp.apk"; //APP下载存放的路径，可以使用cordova file插件进行相关配置
                    let trustHosts = true;
                    let options = {};
                    const fileTransfer: FileTransferObject = this.fileTransfer.create();
                    fileTransfer.download(url, targetPath,trustHosts, options).then(result=>{
                        // 成功
                        loadingStart.dismiss();
                        // 打开下载下来的APP
                        this.fileOpener.open(targetPath, 'application/vnd.android.package-archive')
                    },  (error) => {
                        this.appIonicUtil.toast('下载失败！');
                        loadingStart.dismiss();
                      }).catch(()=>{
                        this.appIonicUtil.toast('下载失败！');
                    });
                        // 进度
                        fileTransfer.onProgress((event) => {
                        //进度，这里使用文字显示下载百分比
                        var downloadProgress = (event.loaded / event.total) * 100;
                        loadingStart.setContent("已经下载：" + Math.floor(downloadProgress) + "%");
                        if (downloadProgress > 99) {
                            loadingStart.dismiss();
                        }
                     });
                }
              }
            },
            {
              text: '残忍放弃',
              handler: () => {            
                  
              }
            }
          ]
      }).present();
        
    }

}
