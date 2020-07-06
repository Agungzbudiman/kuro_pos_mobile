import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../api/global.service';
import { Router } from '@angular/router';
import { ModalController, NavParams,Events,AlertController } from '@ionic/angular';
import { Config } from '../config';

@Component({
  selector: 'app-menu-detail',
  templateUrl: './menu-detail.page.html',
  styleUrls: ['./menu-detail.page.scss'],
})
export class MenuDetailPage implements OnInit {

  dataMenu:any = {};
  configModal:any = '';
  constructor(
    public glbSvc   : GlobalService,
    private router: Router,
    public events    : Events,
    public alertCtrl    : AlertController,
    private modalController: ModalController,
    private navParams: NavParams) {
      // this.getBarang();

    }

  ngOnInit() {
  }
  ionViewWillEnter(){
    // console.log(Config.menuSelect);
    this.dataMenu = Config.menuSelect;
    this.configModal = Config.modalMenu;
    if(this.dataMenu.jumlah == undefined){
      this.dataMenu.jumlah = 0;
    }
    if(this.dataMenu.note == undefined){
      this.dataMenu.note = '';
    }
  }

  closeModal()
  {
    const onClosedData: string = null;
    this.modalController.dismiss(onClosedData);
  }

}
