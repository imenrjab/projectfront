import { Routes } from '@angular/router';
import { Access } from './access';

import { Error } from './error';
import { LoginComponent } from '../component-gestionemploiye/login/login.component';
import { AjouteempComponent } from '../../auth/ajouteemp/ajouteemp.component';
import { ChefdequartComponent } from '../chefdequart/chefdequart.component';
import { GestionEmployeComponent } from '../component-gestionemploiye/gestion-employe/gestion-employe.component';
import { ChefdeblocComponent } from '../chefdebloc/chefdebloc.component';
import { ConsulterCongeComponent } from '../component-gestionemploiye/consulter-conge/consulter-conge.component';
import { SoldeComponent } from '../../solde/solde.component';

export default [
    { path: 'access', component: Access },
    { path: 'error', component: Error },
    { path: '', component: LoginComponent },
    { path: 'regestreRonders', component: AjouteempComponent},
    { path: 'chefdequart', component: ChefdequartComponent},
    { path: 'consulter', component: ConsulterCongeComponent},

    { path: 'chefdebloc', component:ChefdeblocComponent},
    { path: 'solde', component:SoldeComponent},
    { path: 'gestionemp', component: GestionEmployeComponent}




] as Routes;
