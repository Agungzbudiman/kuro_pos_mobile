import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpModule, /* other http imports */ } from "@angular/http";

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {IonicStorageModule} from "@ionic/storage";
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ListBarangPageModule } from './list-barang/list-barang.module';
import { MenuDetailPageModule } from './menu-detail/menu-detail.module';
import { CheckoutPageModule } from './checkout/checkout.module';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const configSoket: SocketIoConfig = { url: 'http://socket.kurohat.my.id', options: {} };

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
            IonicModule.forRoot(), 
            AppRoutingModule,
            IonicStorageModule.forRoot(),
            SocketIoModule.forRoot(configSoket),
            HttpModule,
            MenuDetailPageModule,
            ListBarangPageModule,
            CheckoutPageModule],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
