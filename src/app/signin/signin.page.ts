import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../api/global.service';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';
import { Config } from '../config';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

    formData = {
      // signature   : Config.signature,
      email       : '',
      username       : '',
      password    : '',
  }
  constructor(
    public glbSvc   : GlobalService,
    private router: Router,
    public events    : Events) { 
    glbSvc.getDataUser().then(res=>{
      setTimeout(() => {
        if(res != null){
                // this.navCtrl.push(MenuPage);
              this.router.navigateByUrl('/');
            }
      }, 500);
    });
  }

  ngOnInit() {
  }

  postLogin()
  {
      if(this.formData.username == ''){
          this.events.publish("openAlert","Error","Username Kosong");
          return false;
      }
      
      if(this.formData.password == ''){
          this.events.publish("openAlert","Error","Password Kosong");
          return false;
      }
      this.events.publish('showLoading');
      this.glbSvc.doLogin(this.formData).subscribe(res=>{
          // console.log(res);
          this.events.publish('hideLoading');
          // res = res.results;
          // Config.loginStatus  = true;
          if(res.status == 'ok'){
            this.glbSvc.login(res.data);
            this.events.publish('openAlert', 'Berhasil login', res.msg);
            // Config.loginStatus  = true;
            this.router.navigateByUrl('/');
            setTimeout(() => {
              this.events.publish('afterLogin');
            }, 100);
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
