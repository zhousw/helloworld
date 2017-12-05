//import { Camera, CameraOptions } from '@ionic-native/camera';
export class AppConfig {

     static rootIp = '';        // server ip
     static urlRoot = '';       // http://server ip/p name/app/
     static rootPath = '';      // http://server ip/p name/
     static pPath = '';    // http://server ip/p name/admin/
    
     static installPackageIp = '121.40.139.136:7070';   //更新app安装包ip地址
     static installPackageAddr = 'http://' + AppConfig.installPackageIp + '/appVersionManager/pages/package/apa7kphr.apk';   //更新app安装包地址
    
    //$.base64.utf8encode = true;
    
     static loginTimeoutAlert = 0;  //登录超时提示框显示数量(防止显示多个登录超时提示框)
     static notificationAlert = 0;
    
     static androidFilePath = 'file:///storage/emulated/0/info/';    //android 下载的附件存储路径
    
     static ccInfo = {
      id:'',
      phone:'',
      kper:{
        id:'',
        name:''
      },
      ccNames: '',
      ccTaxNums: ''
    };
    
    //app.ccImg = {
    //  imgSrc:'',
    //  imgType:''
    //};
    
    //app.isDisable = "true";
     static sessionId = '';
    
    //mobiscroll默认参数
     static currYear = (new Date()).getFullYear();
     static optDate = {  //$('').mobiscroll().date(app.optDate);
        theme: 'android-holo-light',
        mode: 'scroller',
        display: 'bottom',
        lang: 'zh' ,
        dateFormat: 'yy-mm-dd',
        startYear:AppConfig.currYear - 20, //开始年份
        endYear:AppConfig.currYear + 20 //结束年份
    };
     static optDateTime = { //$('').mobiscroll().datetime(app.optDateTime);
        theme: 'android-holo-light',
        mode: 'scroller',
        display: 'bottom',
        lang: 'zh' ,
        dateFormat: 'yy-mm-dd ',
        startYear:AppConfig.currYear - 20, //开始年份
        endYear:AppConfig.currYear + 20 //结束年份
    };
     static optTime = { //$('').mobiscroll().time(app.optTime);
        theme: 'android-holo-light',
        mode: 'scroller',
        display: 'bottom',
        lang: 'zh' ,
        startYear:AppConfig.currYear - 20, //开始年份
        endYear:AppConfig.currYear + 20 //结束年份
    };
    
     static ionicDatePickerInfo = { //ionic-datepicker默认参数
        titleLabel: '请选择',
        todayLabel: '今天',
        closeLabel: '关闭',
        setLabel: '确定',
        setButtonType : 'button-balanced',
        todayButtonType : 'button-positive',
        closeButtonType : 'button-assertive',
        inputDate: new Date(),
        mondayFirst: true,
        weekDaysList: ['天','一','二','三','四','五','六'],
        monthList: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
        templateType: 'popup',
        callback: function (val) {} //必须重写赋值需要
    };
    
    //摄像头拍照参数
    // static cameraOptions = {
    //     // quality: 50,
    //     // destinationType: Camera.DestinationType.FILE_URI,
    //     // sourceType: Camera.PictureSourceType.CAMERA,
    //     // allowEdit: true,
    //     // encodingType: Camera.EncodingType.JPEG,
    //     // targetWidth: 320,
    //     // targetHeight: 512,
    //     // saveToPhotoAlbum: false,
    //     // correctOrientation:true
    // };
    
    //图片选择器参数
    static imagePickerOptions = {
        maximumImagesCount: 3,
        width: 320,
        height: 0,
        quality: 50
    };
    
}