import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupListComponent } from './signup-list/signup-list.component';


const routes: Routes = [
  {
    path: "",
    component: SignupListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
