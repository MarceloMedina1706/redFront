import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { ModalComponent } from './components/modal/modal.component';
import { UserComponent } from './components/user/user.component';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [LoginGuardGuard]},
  {path: 'inicio', component: InicioComponent, canActivate: [UserGuard]},
  {path: '', component: InicioComponent, canActivate: [UserGuard]},
  {path: 'user', component: UserComponent, canActivate: [UserGuard]},
  {path: 'user/:id', component: UserComponent, canActivate: [UserGuard]},
  {path: 'modal', component: ModalComponent, canActivate: [UserGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
