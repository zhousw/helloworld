import { Component  } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController  } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { AppConfig } from "../../app/app.config";
import { AppIonicUtil } from "../../app/app.ionic.util";
import { Platform } from 'ionic-angular';
import { ImgBean } from '../../Model/image';
import { Camera, CameraOptions } from '@ionic-native/camera';
@IonicPage()
@Component({
  selector: 'page-img-upload',
  templateUrl: 'img-upload.html',
})
export class ImgUploadPage {
  
  title="选择图片";
  uploadImgSrcs = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public imagePicker:ImagePicker,
    private platform:Platform,
    public camera:Camera,
    public alertCtrl:AlertController,
    public appIonicUtil:AppIonicUtil
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImgUploadPage');
  }

  //选择图片
  selectImg (){
    try{
      this.platform.ready().then(() => {
        this.imagePicker.getPictures(AppConfig.imagePickerOptions)
        .then((results)=> {
          if(results.length > 0){
            for(let i=0;i<results.length;i++){
              //let newImageUrl = uploadHead(results[i]);
              // if(this.platform.isAndroid()){
              //   appendFile(results[i]);
              // }else {
                this.uploadImgSrcs.push(results[i]);
              //}
            }
          }
        }).catch(erro =>{
          console.log(erro);
        })
      });
    }catch (e){
      console.error(e);
    }
  }

  //清空图片
  clearImg (){
      this.uploadImgSrcs = [];
      ImgBean.imgSrcs = [];
      //scrollDelegate.$getByHandle('imgUploadScroll').resize();
  }
  //保存
  subImg (){
    for(let i=0;i<this.uploadImgSrcs.length;i++){
      ImgBean.imgSrcs.push(this.uploadImgSrcs[i]);
    }
    this.navCtrl.pop();
  }

  delUploadImgSrcs (index){
    this.alertCtrl.create({
      title: '提示',
      message: '<span class="rem-3">确认删除？</span>',
      buttons: [
        {
          text: '是',
          handler: () => {            
            this.uploadImgSrcs.splice(index,1);
            ImgBean.imgSrcs.splice(index,1);
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

  //打开摄像头
  openCamera (){
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
          this.camera.getPicture(options).then((imageData) =>{
                //let imageURI = "data:image/jpeg;base64," + imageData;
                this.uploadImgSrcs.push(imageData);
            }).catch(erro =>{
               console.log(erro);
            })
    }catch (e){
      console.error(e);
    }
  }



}
