import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'checkout', loadChildren: './checkout/checkout.module#CheckoutPageModule' },
  { path: 'history-tabs', loadChildren: './history-tabs/history-tabs.module#HistoryTabsPageModule' },
  { path: 'pos', loadChildren: './pos/pos.module#PosPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'signin', loadChildren: './signin/signin.module#SigninPageModule' },
  { path: 'transaksi', loadChildren: './transaksi/transaksi.module#TransaksiPageModule' },
  { path: 'list-barang', loadChildren: './list-barang/list-barang.module#ListBarangPageModule' },
  { path: 'update-cart', loadChildren: './update-cart/update-cart.module#UpdateCartPageModule' },
  { path: 'detail-transaksi', loadChildren: './detail-transaksi/detail-transaksi.module#DetailTransaksiPageModule' },
  { path: 'menu', loadChildren: './menu/menu.module#MenuPageModule' },
  { path: 'menu-detail', loadChildren: './menu-detail/menu-detail.module#MenuDetailPageModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
