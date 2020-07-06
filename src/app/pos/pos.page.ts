import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../api/global.service';
import { Router } from '@angular/router';
import { ModalController,Events,AlertController } from '@ionic/angular';
import { Config } from '../config';
import { ListBarangPage } from '../list-barang/list-barang.page';
import { CheckoutPage } from '../checkout/checkout.page';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.page.html',
  styleUrls: ['./pos.page.scss'],
})
export class PosPage implements OnInit {

  listHistory:any=[];
  items:any = [];
  itemPesan:any = [];
  dataUser:any = {};
  dataTotal:any = {totalAkan:0,totalDipesan:0};
  statusMenu = {'1':'Waiting List', '2' :'Proses', '3': 'Selesai'};

    constructor(
    public glbSvc   : GlobalService,
    private router: Router,
    public alertCtrl: AlertController,
    public modalController: ModalController,
    public events    : Events) {
      this.events.subscribe('getTransaksi', () => {
        this.getMenuPesanan();
      });
      this.events.subscribe('getMenu', () => {
        this.getMenuPesanan();
      });
    }

    ngOnInit() {
      // this.getMenuPesanan();
    }
    getMenuPesanan(){
      this.glbSvc.getDataUser().then((rest)=>{
        this.items = Config.cart;
        console.log(this.items);
        this.jumlahTotal();
        this.dataUser = rest;
        if(this.dataUser.userRole == '0'){
          this.getPesanan();
        }
      });
    }
    getPesanan(){
      this.glbSvc.cekPesanan({user_id:this.dataUser.userId}).subscribe(res=>{
        if(res.data.length == 0){
          this.events.publish("openToast",res.msg);
        }else{
          this.itemPesan = res.data;
          this.jumlahTotal();
        }
      });
    }
    ionViewWillEnter(){
      this.getMenuPesanan();
    }
    jumlahTotal(){
      this.dataTotal.totalAkan = 0;
      this.dataTotal.totalDipesan = 0;
      this.items.forEach((v,k) => {
          this.dataTotal.totalAkan += (v.jumlah*v.harga);
      });
      this.itemPesan.forEach((v,k) => {
        if(v.ready =='0'){
          this.dataTotal.totalDipesan += (v.jumlah*v.harga);
        }
      });
    }
    async remove(idx){
      let confirm = await this.alertCtrl.create({
        cssClass: 'my-custom-class',
        header: 'Apakah Ingin Menghapus?',
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
                this.items.splice(idx,1);
                Config.cart.splice(idx,1);
            }
          }
        ]
      });
      await confirm.present();
        // this.app.getRootNav().push(SigninPage);
    }

    async checkout() {
      if(this.itemPesan.length > 0){
        let confirm = await this.alertCtrl.create({
          cssClass: 'my-custom-class',
          header: 'Apakah Ingin Menambah Pesanan?',
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
                let dataTransaksi:any = {};
                dataTransaksi.detail_menu = Config.cart;
                dataTransaksi.user_id = this.dataUser.userId;
                this.events.publish('showLoading',Config.timeOut);
                this.glbSvc.addTransaksi(dataTransaksi).subscribe(res=>{
                  // console.log(res);
                  this.events.publish('hideLoading');
                  // res = res.results;
                  // Config.loginStatus  = true;
                  if(res.status == 'ok'){
                    Config.cart = [];
                    this.items = [];
                    this.getPesanan();
                    this.events.publish('openAlert', 'Berhasil login', res.msg);
                  }else{
                      this.events.publish('openToast', res.msg);
                  }
                },
                err => {
                    this.events.publish('hideLoading');
                    this.events.publish("openToast","Error");
                })
              }
            }
          ]
        });
        await confirm.present();
        return false;
      }


      const modal = await this.modalController.create({
      component: CheckoutPage,
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
    
    // membuka popup pencarian barang
    async openModal(menu) {
      Config.modalMenu = 'update';
      Config.menuSelect = menu;
      const modal = await this.modalController.create({
      component: ListBarangPage,
      componentProps: {
      }
      });
  
      // saat menutup popup menerima hasil return
      modal.onDidDismiss().then((dataReturned) => {
        if (dataReturned.data !== null) {
            console.log(dataReturned);
            var index = Config.cart.findIndex(x => x.id ===menu.id);
            if(index != -1){
                Config.cart[index] = dataReturned.data;
            }
          this.jumlahTotal();
        }
      });
  
      return await modal.present();
    }
}
