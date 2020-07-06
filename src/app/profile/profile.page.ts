import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../api/global.service';
import { Router } from '@angular/router';
import { Events,AlertController } from '@ionic/angular';
import { Config } from '../config';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  data:any = {
      username  : "",
  }
  constructor(
    public glbSvc   : GlobalService,
    private router: Router,
    public alertCtrl: AlertController,
    public events    : Events) { }

  ngOnInit() {
  }

  
  ionViewWillEnter(){
    this.getData();
  }
  getData()
  {
      this.glbSvc.getDataUser().then((rest)=>{
          this.data = rest;
          console.log(rest);
      });
  }
  async goAvailableMasakan()
    {
      let confirm = await this.alertCtrl.create({
        cssClass: 'my-custom-class',
        header: 'Apakah Ingin membuka semua menu yang habis?',
        message: '',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              // console.log('Conf');
            }
          }, {
            text: 'Okay',
            handler: () => {
              this.glbSvc.semuaMenuTersedia(this.data.userToko).subscribe(res=>{
                  if(res.status == 'ok'){
                    this.events.publish('send-kuroPos', {id_toko: this.data.userToko,status:'updateMenu'});
                  }else{
                      this.events.publish('openToast', res.msg);
                  }
              },
              err => {
                  this.events.publish('hideLoading');
                  this.events.publish("openToast","Koneksi anda tidak stabil");
              })
            }
          }
        ]
      });
      await confirm.present();
        // this.app.getRootNav().push(SigninPage);
      
  }
  async goLogout()
    {
      let confirm = await this.alertCtrl.create({
        cssClass: 'my-custom-class',
        header: 'Apakah Ingin keluar?',
        message: '',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              // console.log('Conf');
            }
          }, {
            text: 'Okay',
            handler: () => {
              this.glbSvc.logout();
              this.router.navigateByUrl('/signin');
            }
          }
        ]
      });
      await confirm.present();
        // this.app.getRootNav().push(SigninPage);
      
  }
}
