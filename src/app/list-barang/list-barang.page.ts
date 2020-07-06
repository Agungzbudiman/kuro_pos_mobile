import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../api/global.service';
import { Router } from '@angular/router';
import { ModalController, NavParams,Events,AlertController } from '@ionic/angular';
import { Config } from '../config';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-list-barang',
  templateUrl: './list-barang.page.html',
  styleUrls: ['./list-barang.page.scss'],
})
export class ListBarangPage implements OnInit {
  dataMenu:any = {};
  configModal:any = '';
  dataUser:any = {};
  constructor(
    public glbSvc   : GlobalService,
    private router: Router,
    public events    : Events,
    public alertCtrl    : AlertController,
    private barcodeScanner: BarcodeScanner,
    private modalController: ModalController,
    private navParams: NavParams) {
      // this.getBarang();

    }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.glbSvc.getDataUser().then((rest)=>{
      this.dataUser = rest;
    });
    console.log(Config.menuSelect);
    this.dataMenu = Config.menuSelect;
    this.configModal = Config.modalMenu;
    if(this.dataMenu.jumlah == undefined){
      this.dataMenu.jumlah = 0;
    }
    if(this.dataMenu.note == undefined){
      this.dataMenu.note = '';
    }
  }

  getBarang(){
    //   this.glbSvc.getBarang().subscribe(rs=>{
    //     console.log(rs);
    //     rs = rs.results;
    //     this.dataBarang = rs.data;
    //     // if(Config.base_url_barang == ''){
    //     //     Config.base_url_barang = rs.base_url_barcode;
    //     // }
    //     // this.base_url = Config.base_url_barang;
    // })
  }

  kurang(item)
  {
      // jika barang satu maka kan ada pertanyaan
      if(item.jumlah != 0){
          item.jumlah -= 1;
      }
  }

  // tambah jumlah barang
  tambah(item)
  {
    item.jumlah++;
  }

  addModal()
  {
    if(this.dataMenu.jumlah == 0){

      this.events.publish("openToast","Harap isi jumlah dengan benar");
      return false;
    }
    const onClosedData: string = this.dataMenu;
    this.modalController.dismiss(onClosedData);
  }
  stockModal()
  {
    this.dataMenu.outstok = 'ya';
    const onClosedData: string = this.dataMenu;
    this.modalController.dismiss(onClosedData);
  }
  closeModal()
  {
    const onClosedData: string = null;
    this.modalController.dismiss(onClosedData);
  }
}
