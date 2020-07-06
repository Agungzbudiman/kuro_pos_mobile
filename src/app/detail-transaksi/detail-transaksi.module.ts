import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetailTransaksiPage } from './detail-transaksi.page';

const routes: Routes = [
  {
    path: '',
    component: DetailTransaksiPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetailTransaksiPage]
})
export class DetailTransaksiPageModule {}
