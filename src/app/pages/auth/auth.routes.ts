import { Routes } from '@angular/router';
import { Access } from './access';
import { Login } from './login';
import { Error } from './error';
import { LoginComponent } from '../component-gestionemploiye/login/login.component';
import { AjouteempComponent } from '../../auth/ajouteemp/ajouteemp.component';
import { RondersComponent } from '../../ronders/ronders.component';
import { ChefdequartComponent } from '../../chefdequart/chefdequart.component';
import { GestionEmployeComponent } from '../component-gestionemploiye/gestion-employe/gestion-employe.component';

export default [
    { path: 'access', component: Access },
    { path: 'error', component: Error },
    { path: 'login', component: LoginComponent },
    { path: 'regestreRonders', component: AjouteempComponent},
    { path: 'ronders', component: RondersComponent},
    { path: 'chefdequart', component: ChefdequartComponent},
    { path: 'gestionemp', component: GestionEmployeComponent}




] as Routes;
