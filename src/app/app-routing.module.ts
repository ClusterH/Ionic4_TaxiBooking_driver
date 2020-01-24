
/**
 * Ionic 4 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'slides',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  { path: 'wallet', loadChildren: () => import('./wallet/wallet.module').then(m => m.WalletPageModule) },
  { path: 'paymentmethod', loadChildren: () => import('./paymentmethod/paymentmethod.module').then(m => m.PaymentmethodPageModule) },
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule) },
  { path: 'paymentmethod', loadChildren: () => import('./paymentmethod/paymentmethod.module').then(m => m.PaymentmethodPageModule) },
  { path: 'history', loadChildren: () => import('./history/history.module').then(m => m.HistoryPageModule) },
  { path: 'carddetail', loadChildren: () => import('./carddetail/carddetail.module').then(m => m.CarddetailPageModule) },
  { path: 'invite', loadChildren: () => import('./invite/invite.module').then(m => m.InvitePageModule) },
  { path: 'invitefriends', loadChildren: () => import('./invitefriends/invitefriends.module').then(m => m.InvitefriendsPageModule) },
  { path: 'vehiclemanagement', loadChildren: () => import('./vehiclemanagement/vehiclemanagement.module').then(m => m.VehiclemanagementPageModule) },
  { path: 'addnewvehicle', loadChildren: () => import('./addnewvehicle/addnewvehicle.module').then(m => m.AddnewvehiclePageModule) },
  { path: 'vehiclemanagement', loadChildren: () => import('./vehiclemanagement/vehiclemanagement.module').then(m => m.VehiclemanagementPageModule) },
  { path: 'notifications', loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsPageModule) },
  { path: 'customer-detail', loadChildren: () => import('./customer-detail/customer-detail.module').then(m => m.CustomerDetailPageModule) },
  {
    path:'customerRequest',loadChildren:() => import('./customer-request/customer-request.module').then(m => m.CustomerRequestPageModule)
  },
  { path: 'chat', loadChildren: () => import('./chat/chat.module').then(m => m.ChatPageModule) },
  { path: 'setting', loadChildren: () => import('./setting/setting.module').then(m => m.SettingPageModule) },
  { path: 'documentmanagement', loadChildren: () => import('./documentmanagement/documentmanagement.module').then(m => m.DocumentmanagementPageModule) },
  { path: 'drivinglicense', loadChildren: () => import('./drivinglicense/drivinglicense.module').then(m => m.DrivinglicensePageModule) },
  { path: 'edit-profile', loadChildren: () => import('./edit-profile/edit-profile.module').then(m => m.EditProfilePageModule) },
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'verify-otp', loadChildren: () => import('./verify-otp/verify-otp.module').then(m => m.VerifyOTPPageModule) },
  { path: 'slides', loadChildren: () => import('./slides/slides.module').then(m => m.SlidesPageModule) },
  { path: 'location', loadChildren: () => import('./location/location.module').then(m => m.LocationPageModule) },
  { path: 'terms-condictions', loadChildren: () => import('./terms-condictions/terms-condictions.module').then(m => m.TermsCondictionsPageModule) },
  { path: 'contact-us', loadChildren: () => import('./contact-us/contact-us.module').then(m => m.ContactUSPageModule) },
  { path: 'approved', loadChildren: () => import('./approved/approved.module').then(m => m.ApprovedPageModule) },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

