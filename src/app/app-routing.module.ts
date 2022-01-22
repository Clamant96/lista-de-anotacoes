import { ListaComponent } from './lista/lista.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '', redirectTo: 'login', pathMatch: 'full'
},
{
  path: 'home', component: HomeComponent
},
{
  path: 'login', component: LoginComponent
},
{
  path: 'cadastro', component: CadastroComponent
},
{
  path: 'lista/:id', component: ListaComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
