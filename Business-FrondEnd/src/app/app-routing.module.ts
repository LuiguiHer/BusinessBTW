import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ListBusinessComponent } from './components/list-business/list-business.component';
import { ReadBusinessComponent } from './components/read-business/read-business.component';
import { AddEditBusinessComponent } from './components/add-edit-business/add-edit-business.component';

const routes: Routes = [
  { path: '', redirectTo: 'homePage', pathMatch: 'full'},
  { path: 'homePage', component: HomePageComponent},
  { path: 'listBusiness', component: ListBusinessComponent},
  { path: 'readBusiness/:id', component: ReadBusinessComponent},
  { path: 'addBusiness', component: AddEditBusinessComponent},
  { path: 'editBusiness/:id', component: AddEditBusinessComponent},
  { path: '**', redirectTo: 'homePage', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
