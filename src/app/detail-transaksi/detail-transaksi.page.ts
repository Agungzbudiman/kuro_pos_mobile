import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../api/global.service';
import { Router } from '@angular/router';
import { ModalController,Events,AlertController } from '@ionic/angular';
import { Config } from '../config';
import { ListBarangPage } from '../list-barang/list-barang.page';
import { MenuDetailPage } from '../menu-detail/menu-detail.page';
import { CheckoutPage } from '../checkout/checkout.page';

@Component({
  selector: 'app-detail-transaksi',
  templateUrl: './detail-transaksi.page.html',
  styleUrls: ['./detail-transaksi.page.scss'],
})
export class DetailTransaksiPage implements OnInit {

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
      
    }

    ngOnInit() {
      // this.getMenuPesanan();
    }
    ionViewWillEnter(){
      this.getPesanan();
    }
    getPesanan(){
      let detailTransaksi:any = Config.transaksiSelect;
      this.glbSvc.cekPesananTransaksi({transaksi_id:detailTransaksi.transaksi_id}).subscribe(res=>{
        if(res.data.length == 0){
          this.events.publish("openToast",res.msg);
        }else{
          this.itemPesan = res.data;
          this.jumlahTotal();
        }
      });
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
