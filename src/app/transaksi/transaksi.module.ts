import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TransaksiPage } from './transaksi.page';

import { AtasNamaPipe } from '../pipe/atasNamaPipe';
const routes: Routes = [
  {
    path: '',
    component: TransaksiPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TransaksiPage,AtasNamaPipe]
})
export class TransaksiPageModule {}
