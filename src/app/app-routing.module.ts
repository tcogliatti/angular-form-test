import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstFormComponent } from './first-form/first-form.component';
import { SecondFormComponent } from './second-form/second-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'first-form', pathMatch: 'full' },
  { path: 'first-form', component: FirstFormComponent },
  { path: 'second-form', component: SecondFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
