import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../api/global.service';
import { Router } from '@angular/router';
import { ModalController, NavParams,Events,AlertController } from '@ionic/angular';
import { Config } from '../config';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  formData = {
    ppn  : false,
    atas_nama:''
  }
  dataUser:any = {};

  totalBayar = 0;
  totalKembali = 0;
  base_url = '';
  constructor(
    public glbSvc   : GlobalService,
    private router: Router,
    private modalController: ModalController,
    public events    : Events) { 
    //   this.dataBarang = Config.dataBarang;
    //   this.base_url = Config.base_url_barang;
      this.jumlahTotal();
      this.totalKembali = 0 - this.totalBayar;
      console.log(this.totalKembali);
      
      this.glbSvc.getDataUser().then((rest)=>{
        this.dataUser = rest;
      });
    }

  ngOnInit() {
  }

  
  jumlahTotal(){
      setTimeout(() => {
          this.totalBayar = 0;
          Config.cart.forEach((v,k) => {
          this.totalBayar += (v.jumlah*v.harga);
          });
          if(this.formData.ppn == true){
              this.totalBayar += (this.totalBayar*10/100);
          }
      }, 100);
  }
  pesanSekarang()
  {
    if(this.formData.atas_nama == ''){
      this.events.publish("openToast","Isi Atas Nama Terlebih dahulu");
      return false;
    }

    let dataTransaksi:any = this.formData;
    dataTransaksi.detail_menu = Config.cart;
    dataTransaksi.user_id = this.dataUser.userId;
    dataTransaksi.toko_id = this.dataUser.userToko;
    this.events.publish('showLoading',Config.timeOut);
    this.glbSvc.saveTransaksi(dataTransaksi).subscribe(res=>{
      // console.log(res);
      this.events.publish('hideLoading');
      // res = res.results;
      // Config.loginStatus  = true;
      if(res.status == 'ok'){
        Config.cart = [];
        this.events.publish('openAlert', 'Berhasil Transaksi', res.msg);
        this.closeModal();
        this.events.publish('getTransaksi');
      }else{
        this.events.publish('openToast', res.msg);
      }
    },
    err => {
        this.events.publish('hideLoading');
        this.events.publish("openToast","Error");
    })
  }
  closeModal()
  {
    const onClosedData: string = null;
    this.modalController.dismiss(onClosedData);
  }
}
