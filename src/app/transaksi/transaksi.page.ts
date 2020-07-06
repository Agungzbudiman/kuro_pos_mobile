import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../api/global.service';
import { Router } from '@angular/router';
import { ModalController,Events,AlertController } from '@ionic/angular';
import { Config } from '../config';
import { ListBarangPage } from '../list-barang/list-barang.page';
import { url } from 'inspector';

@Component({
  selector: 'app-transaksi',
  templateUrl: './transaksi.page.html',
  styleUrls: ['./transaksi.page.scss'],
})
export class TransaksiPage implements OnInit {
  public items: any = [];
  public filter:any = {atasnama:''};
  public urlPrint:any = Config.URLPrint;
  constructor(
  public glbSvc   : GlobalService,
  private router: Router,
  public alertCtrl: AlertController,
  public modalController: ModalController,
  public events    : Events) {
      this.items = [];
  }

  ngOnInit() {
    this.getData();
  }
  getData(){
    let dataUser:any = {};
    this.glbSvc.getDataUser().then((rest)=>{
      dataUser = rest;
      if(rest != undefined){
        this.getTransaksi(dataUser.userToko);
      }
    });
  }

  removeString(){
    this.filter.atasnama = '';
  }

  getTransaksi(userToko){
    this.events.publish('showLoading',Config.timeOut);
    this.glbSvc.getAllPesanan(userToko).subscribe(res=>{
        // console.log(res);
        this.events.publish('hideLoading');
        // res = res.results;
        // Config.loginStatus  = true;
        if(res.status == 'ok'){
          this.items = res.data;
          // console.log(this.items);
        }else{
            this.events.publish('openToast', res.msg);
        }
    },
    err => {
        this.events.publish('hideLoading');
        this.events.publish("openToast","Koneksi anda tidak stabil");
    })
  }
  openPrint(item){
    var urlNya = this.urlPrint+'/print_invoice/'+item.transaksi_no+'/'+item.id_toko;
    console.log(urlNya);
    window.open(urlNya, '_system', 'location=yes');
    return false;
  }

  async updateTransaksi(item){
      let confirm = await this.alertCtrl.create({
        cssClass: 'my-custom-class',
        header: 'Apakah Transaksi Sudah dibayar?',
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
              this.glbSvc.clearTransaksi(item.transaksi_id).subscribe(res=>{
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

  openTransaksi(item){
    Config.transaksiSelect = item;
    this.router.navigate(['detail-transaksi']);
  }
}
