import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../api/global.service';
import { Router } from '@angular/router';
import { ModalController,Events,AlertController } from '@ionic/angular';
import { MenuDetailPage } from '../menu-detail/menu-detail.page';
import { Config } from '../config';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  listHistory:any=[];
  items:any = [];
  itemPesan:any = [];
  dataUser:any = {};
  dataTotal:any = {totalAkan:0,totalDipesan:0};
  statusMenu = {'1':'Baru', '2' :'Sudah Matang', '3': 'Selesai'};

    constructor(
    public glbSvc   : GlobalService,
    private router: Router,
    public alertCtrl: AlertController,
    public modalController: ModalController,
    public events    : Events) {
      
    }

    ngOnInit() {
      // this.getMenuPesanan();
    }
    ionViewWillEnter(){
      this.getData();
    }
    getData(){
      let dataUser:any = {};
      this.glbSvc.getDataUser().then((rest)=>{
        dataUser = rest;
        if(rest != undefined){
          this.getPesanan(dataUser.userToko);
        }
      });
    }
    getPesanan(id_toko){
      let detailTransaksi:any = Config.transaksiSelect;
      this.glbSvc.cekMenuPesanan({id_toko:id_toko}).subscribe(res=>{
        if(res.data.length == 0){
          this.events.publish("openToast",res.msg);
        }else{
          this.itemPesan = res.data;
        }
      });
    }
    async updateMasak(item){
      let confirm = await this.alertCtrl.create({
        cssClass: 'my-custom-class',
        header: 'Apakah Menu Akan Diproses?',
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
              this.events.publish('showLoading',Config.timeOut);
              this.glbSvc.updateMenuTransaksi(item.id,2).subscribe(res=>{
                this.events.publish('hideLoading');
                if(res.status == 'ok'){
                    this.events.publish('openToast', res.msg);
                    this.getData();
                  this.events.publish('send-kuroPos', {id_toko: this.dataUser.userToko,status:'prosesMasak'});
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
  }
  async serveMasak(item){
    let confirm = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Apakah Menu Sudah Disajikan?',
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
            this.events.publish('showLoading',Config.timeOut);
            this.glbSvc.updateMenuTransaksi(item.id,3).subscribe(res=>{
              this.events.publish('hideLoading');
              if(res.status == 'ok'){
                  this.events.publish('openToast', res.msg);
                  this.getData();
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
  }
  
  // membuka popup menu detail
  async detaiMenu(menu) {
    Config.modalMenu = 'update';
    Config.menuSelect = menu;
    const modal = await this.modalController.create({
    component: MenuDetailPage,
    componentProps: {
    }
    });

    // saat menutup popup menerima hasil return
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data !== null) {
      }
    });

    return await modal.present();
  }
}
