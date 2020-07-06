import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../api/global.service';
import { Router } from '@angular/router';
import { ModalController,Events,AlertController } from '@ionic/angular';
import { Config } from '../config';
import { ListBarangPage } from '../list-barang/list-barang.page';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  public items: any = [];
  public dataUser:any = {};
  constructor(
    public glbSvc   : GlobalService,
    private router: Router,
    public modalController: ModalController,
    public events    : Events) {
      this.items = [];
      this.events.subscribe('afterLogin', () => {
        this.getData();
      });
      this.events.subscribe('getMenu', () => {
        this.getData();
      });
    }

  ngOnInit() {
    this.getData();
  }
  getData(){
    this.glbSvc.getDataUser().then((rest)=>{
      this.dataUser = rest;
      if(rest != undefined){
        this.getMenu(this.dataUser.userToko);
      }
    });
  }
  getMenu(userToko){
    this.events.publish('showLoading',Config.timeOut);
    this.glbSvc.getMenu(userToko).subscribe(res=>{
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
  goToPos(){
    this.router.navigateByUrl('/pos');
  }
  expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.items.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }
  
  // membuka popup pencarian barang
  async openModal(menu) {
    var index = Config.cart.findIndex(x => x.id ===menu.id);
    if(index != -1){
      this.events.publish('openAlert', 'Peringatan', 'Harap jumlah di cart yang akan di pesan');
      return false;
    }
    Config.modalMenu = 'tambah';
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
        if(dataReturned.data.outstok != undefined){
          this.glbSvc.updateStatusMenu(dataReturned.data).subscribe(res=>{
              if(res.status == 'ok'){
                // this.getData();
                this.events.publish('send-kuroPos', {id_toko: this.dataUser.userToko,status:'updateMenu'});
              }else{
                  this.events.publish('openToast', res.msg);
              }
          },
          err => {
              this.events.publish('hideLoading');
              this.events.publish("openToast","Koneksi anda tidak stabil");
          })
        }else{
          Config.cart.push(dataReturned.data);
          this.events.publish('openToast', 'Menu Sudah ditambahkan',500);
        }
      }
    });
 
    return await modal.present();
  }

}
