import { Component } from '@angular/core';

import { Platform,Events,AlertController,LoadingController,ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router,ActivatedRoute, } from '@angular/router';
import {GlobalService} from './api/global.service';
import { timeout } from 'rxjs/operators';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  confirmExitAppStatus = false;
  confirmExitApp      : any;
  loading             : any;
  loadingTimeout      : any;
  
  constructor(
    public glbSvc   : GlobalService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public toastController: ToastController,
    public loadingCtrl  : LoadingController,
    public alertCtrl    : AlertController,
    public events    : Events,
    private socket: Socket,
    public router:Router
  ) {
    this.initializeApp();
    this.events.subscribe('showLoading', (timeout = 20000) => {
      this.showLoading(timeout);
    });
  
    this.events.subscribe('hideLoading', () => {
        this.hideLoading();
    });

    this.events.subscribe('openToast',(content = '',timeout = 1500)=>{
      this.presentToast(content,timeout);
    })
  
    this.events.subscribe('openAlert', (title, msg) => {
        this.openAlert(title, msg);
    })

    this.socket.fromEvent('kuroPos').subscribe(message => {
      console.log(message);
      let dataUser:any = {};
      let messageGet:any = message;
      this.glbSvc.getDataUser().then((rest)=>{
        dataUser = rest;
        if(rest != undefined){
          if(rest.userToko == messageGet.id_toko){
            if(messageGet.status == 'updateMenu'){
              this.events.publish('getMenu');
            }
            if(messageGet.status == 'prosesMasak'){
              this.events.publish('getTransaksi');
            }
          }
        }
      });
      // this.messages.push(message);
    });

    this.events.subscribe('send-kuroPos', (data) => {
      this.socket.emit('send-kuroPos', { id_toko: data.id_toko,status:data.status });
  })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      setTimeout(() => {
        this.splashScreen.hide();        
      }, 300);
      this.router.navigateByUrl('/');
      this.socket.connect();
    });
  }

  async presentToast(message,duration = 1500) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration
    });
    toast.present();
  }

  async openAlert(title, msg)
  {
      let inTitle = {
        header     : title,
        message  : msg,
        buttons   : ['OK']
      };
      let alert:any = await this.alertCtrl.create(inTitle);
      await alert.present();
  }

  async showLoading(timeout = 20000)
  {
      this.loading = await this.loadingCtrl.create({
        cssClass: 'my-custom-class',
        message: 'Please wait...',
        duration: timeout
      });
      await this.loading.present();
  }

  async hideLoading()
  {
      if(this.loading != undefined && this.loading != '')
      {
          await this.loading.dismiss();
          this.loading = '';
      }
  }
}
