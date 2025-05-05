import { Routes } from '@angular/router';
import { Documentation } from './documentation/documentation';

import { Empty } from './empty/empty';
import { GestionEmployeComponent } from './component-gestionemploiye/gestion-employe/gestion-employe.component';
import { DemandeCongeComponent } from '../demande-conge/demande-conge.component';

export default [
    { path: 'documentation', component: Documentation },
    { path: 'Ronders', component: GestionEmployeComponent },
    { path: 'demandeconge', component: DemandeCongeComponent },

    { path: 'empty', component: Empty },
    { path: '**', redirectTo: '/notfound' },

] as Routes;
