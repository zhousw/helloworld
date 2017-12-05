import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Platform,AlertController } from 'ionic-angular';
import { ImgBean } from '../../Model/image';
import { ImagePicker } from '@ionic-native/image-picker';
import { AppConfig } from '../../app/app.config';
import { AppIonicUtil } from "../../app/app.ionic.util";
import { Camera,CameraOptions } from '@ionic-native/camera';
@IonicPage()
@Component({
  selector: 'page-img-hw-upload',
  templateUrl: 'img-hw-upload.html',
})
export class ImgHwUploadPage {
  title="选择图片";
  uploadHwImgSrcs = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private platform:Platform,
    public imagePicker:ImagePicker,
    public camera:Camera,
    public alertCtrl:AlertController,
    public appIonicUtil:AppIonicUtil
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImgHwUploadPage');
  }

  delUploadHwImgSrcs (index){
    this.alertCtrl.create({
      title: '提示',
      message: '<span class="rem-3">确认删除？</span>',
      buttons: [
        {
          text: '是',
          handler: () => {            
            this.uploadHwImgSrcs.splice(index,1);
            ImgBean.imgHwSrcs.splice(index,1);
            this.appIonicUtil.toast('删除成功！');
          }
        },
        {
          text: '否',
          handler: () => {            
              console.log('否');
          }
        }
        ]
    }).present();
  }

  selectHwImg (){
    try{
      this.platform.ready().then(() => {
        this.imagePicker.getPictures(AppConfig.imagePickerOptions)
          .then((results) => {
            if(results.length > 0){
              for(var i=0;i<results.length;i++){
                //var newImageUrl = uploadHead(results[i]);
                // if(ionic.Platform.isAndroid()){
                //   appendHwFile(results[i]);
                // }else {
                  this.uploadHwImgSrcs.push(results[i]);
                //}
              }
            }
          }).catch(erro =>{
            console.log(erro);
          })
    })
    }catch (e){
      console.error(e);
    }
  }

  clearHwImg (){
      this.uploadHwImgSrcs = [];
      ImgBean.imgHwSrcs = [];
      //scrollDelegate.$getByHandle('imgUploadScroll').resize();
  }

  subHwImg (){
    for(var i=0;i<this.uploadHwImgSrcs.length;i++){
      ImgBean.imgHwSrcs.push(this.uploadHwImgSrcs[i]);
    }
    this.navCtrl.pop();
  }

  openHwCamera (){
    try{
      const options: CameraOptions ={
        quality: 50,
        destinationType: this.camera.DestinationType.FILE_URI,
        sourceType: this.camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: this.camera.EncodingType.JPEG,
        targetWidth: 320,
        targetHeight: 512,
        saveToPhotoAlbum: false, //保存进手机相册
        correctOrientation:true
      }
        this.camera.getPicture(options).then(imageData =>{
            //var imageURI = "data:image/jpeg;base64," + imageData;
            this.uploadHwImgSrcs.push(imageData);
          }).catch(erro =>{
            console.log(erro);
          })
    }catch (e){
      console.error(e);
    }
  }




}
