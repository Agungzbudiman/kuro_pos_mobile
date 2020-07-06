import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
// import 'rxjs/add/operator/map';
import { Observable, of, Subject } from 'rxjs';

import { Config } from '../config';

import {Storage} from "@ionic/storage";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(public http: Http,
    private storage: Storage) { }
  doLogin(data): Observable<any>
  {
    let body = new FormData();
    body.append('username',data.username);
    body.append('password',data.password);
    body.append('signature','ae72e97648a54ad23675e7198bad05fa5da85780');
    return this.http.post(Config.URLServer + '/login', body).pipe(
      	map(res=>res.json())
    );
  }

  getMenu(userToko): Observable<any>
  {
    let body = new FormData();
    body.append('signature','ae72e97648a54ad23675e7198bad05fa5da85780');
    // body.append('toko_id',userToko);
    return this.http.get(Config.URLServer + '/getmenu/'+userToko)
    .pipe(
      	map(res=>res.json())
    );
  }

  saveTransaksi(data): Observable<any>
  {
    let body = new FormData();
    data.detail_menu.forEach((v,k) => {
      if(v.jumlah > 0){
        body.append('menu['+k+'][menu_id]',v.id);
        body.append('menu['+k+'][jumlah]',v.jumlah);
        body.append('menu['+k+'][note]',v.note);
      }
    });
    body.append('transaksi_atas_nama',data.atas_nama);
    body.append('transaksi_ppn',data.ppn);
    body.append('id_user',data.user_id);
    body.append('id_toko',data.toko_id);
    body.append('signature','ae72e97648a54ad23675e7198bad05fa5da85780');
    return this.http.post(Config.URLServer + '/saveTransaksi', body)
    .pipe(
      	map(res=>res.json())
    );
  }

  getAllPesanan(id_toko): Observable<any>
  {
    let body = new FormData();
    body.append('id_toko',id_toko);
    body.append('signature','ae72e97648a54ad23675e7198bad05fa5da85780');
    return this.http.post(Config.URLServer + '/getAllPesanan', body)
    .pipe(
      	map(res=>res.json())
    );
  }

  cekMenuPesanan(data): Observable<any>
  {
    let body = new FormData();
    body.append('id_toko',data.id_toko);
    body.append('signature','ae72e97648a54ad23675e7198bad05fa5da85780');
    return this.http.post(Config.URLServer + '/cekMenuPesanan', body)
    .pipe(
      	map(res=>res.json())
    );
  }

  updateMenuTransaksi(id,status): Observable<any>
  {
    let body = new FormData();
    body.append('transaksi_detail_id',id);
    body.append('transaksi_detail_status',status);
    body.append('signature','ae72e97648a54ad23675e7198bad05fa5da85780');
    return this.http.post(Config.URLServer + '/updateMenuTransaksi', body)
    .pipe(
      	map(res=>res.json())
    );
  }

  updateStatusMenu(data): Observable<any>
  {
    let body = new FormData();
    body.append('menu_id',data.id);
    body.append('status',data.show);
    body.append('signature','ae72e97648a54ad23675e7198bad05fa5da85780');
    return this.http.post(Config.URLServer + '/updateStatusMenu', body)
    .pipe(
      	map(res=>res.json())
    );
  }

  semuaMenuTersedia(toko_id): Observable<any>
  {
    let body = new FormData();
    body.append('id_toko',toko_id);
    body.append('signature','ae72e97648a54ad23675e7198bad05fa5da85780');
    return this.http.post(Config.URLServer + '/semuaMenuTersedia', body)
    .pipe(
      	map(res=>res.json())
    );
  }

  addTransaksi(data): Observable<any>
  {
    let body = new FormData();
    data.detail_menu.forEach((v,k) => {
      if(v.jumlah > 0){
        body.append('menu['+k+'][menu_id]',v.id);
        body.append('menu['+k+'][jumlah]',v.jumlah);
        body.append('menu['+k+'][note]',v.note);
      }
    });
    body.append('id_user',data.user_id);
    body.append('signature','ae72e97648a54ad23675e7198bad05fa5da85780');
    return this.http.post(Config.URLServer + '/addTransaksi', body)
    .pipe(
      	map(res=>res.json())
    );
  }

  cekPesanan(data): Observable<any>
  {
    let body = new FormData();
    body.append('user_id',data.user_id);
    body.append('signature','ae72e97648a54ad23675e7198bad05fa5da85780');
    return this.http.post(Config.URLServer + '/checkPesanan', body)
    .pipe(
      	map(res=>res.json())
    );
  }

  cekPesananTransaksi(data): Observable<any>
  {
    let body = new FormData();
    body.append('transaksi_id',data.transaksi_id);
    body.append('signature','ae72e97648a54ad23675e7198bad05fa5da85780');
    return this.http.post(Config.URLServer + '/cekPesananTransaksi', body)
    .pipe(
      	map(res=>res.json())
    );
  }

  clearTransaksi(transaksi_id): Observable<any>
  {
    let body = new FormData();
    body.append('transaksi_id',transaksi_id);
    body.append('signature','ae72e97648a54ad23675e7198bad05fa5da85780');
    return this.http.post(Config.URLServer + '/clearTransaksi', body)
    .pipe(
      	map(res=>res.json())
    );
  }

  getDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
  
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
  
    return [year, month, day].join('-');
  }

  getListTransaksi(data): Observable<any>
  {
    let body = new FormData();
    if(data.pilihan =='Hari ini'){
      body.append('transaksi_date',this.getDate(new Date()));
    }else if(data.pilihan =='Kemarin'){
      let tanggal = new Date();
      tanggal.setDate(tanggal.getDate() - 1);
      body.append('transaksi_date',this.getDate(tanggal));
    }else{
      body.append('transaksi_date',this.getDate(data.pilihanTanggal));
    }
    body.append('signature','ae72e97648a54ad23675e7198bad05fa5da85780');
    return this.http.post(Config.URLServer + '/getTransaksi', body)
    .pipe(
      	map(res=>res.json())
    );
  }

  getListDetailTransaksi(data): Observable<any>
  {
    let body = new FormData();
    body.append('transaksi_id',data.transaksi_id);
    body.append('signature','ae72e97648a54ad23675e7198bad05fa5da85780');
    return this.http.post(Config.URLServer + '/getDetailTransaksi', body)
    .pipe(
      	map(res=>res.json())
    );
  }

  
  saveData(user) {
    this.storage.set('dataUser', user).then(() => {
        Config.loginData = user;
    });
  }


  getDataUser():Promise<any> {
    return this.storage.get('dataUser').then((user) => {
      console.log(user);
      Config.loginData = user;
      return user;
    });
  }

	logout() {
		this.storage.remove('dataUser').then(() => {
				Config.loginStatus = false;
				Config.storageData = null;
		});
		return true;
  }
  
  login(user) {
    Config.loginData = user;
    this.storage.set('dataUser', user).then(() => {
        Config.loginStatus = true;
    });
  }

	getUser() {
		this.storage.get('dataUser').then((user) => {
			Config.storageData = user;
			Config.loginStatus = true;
		});
	}
}
