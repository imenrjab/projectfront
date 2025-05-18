import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];
//linksidebar
   ngOnInit() {
    this.model = [
        {
            label: 'Accueil',
            items: [
                { label: 'Dashboard', icon: 'pi pi-home', routerLink: ['/'] }
            ]
        },
        {
            label: 'Pages',
            icon: 'pi pi-folder',
            routerLink: ['/pages'],
            items: [
                {
                    label: 'Landing',
                    icon: 'pi pi-globe',
                    routerLink: ['/landing']
                },
                {
                    label: 'Authentification',
                    icon: 'pi pi-user',
                    items: [
                        {
                            label: 'Login',
                            icon: 'pi pi-sign-in',
                            routerLink: ['/auth/login']
                        },
                        {
                            label: 'Erreur',
                            icon: 'pi pi-times-circle',
                            routerLink: ['/auth/error']
                        },
                        {
                            label: 'Accès refusé',
                            icon: 'pi pi-lock',
                            routerLink: ['/auth/access']
                        }
                    ]
                },
                {
                    label: 'Consulter congé',
                    icon: 'pi pi-calendar',
                    routerLink: ['/auth/consulter']
                },
                {
                    label: 'Ronders',
                    icon: 'pi pi-users	',
                    routerLink: ['/pages/Ronders']
                },
                {
                    label: 'Chef de quart',
                    icon: 'pi pi-briefcase',
                    routerLink: ['/auth/chefdequart']
                },
                {
                    label: 'Chef de bloc',
                    icon: 'pi pi-building',
                    routerLink: ['/auth/chefdebloc']
                },
                {
                    label: 'Demande de congé',
                    icon: 'pi pi-send',
                    routerLink: ['/pages/demandeconge']
                },
                {
                    label: ' Table de roulement',
                    icon: 'pi pi-table	',
                    routerLink: ['/pages/roulement']
                },
                {
                    label: 'Solde de congé',
                    icon: 'pi pi-wallet',
                    routerLink: ['/auth/solde']
                },
                {
                    label: 'Page non trouvée',
                    icon: 'pi pi-exclamation-triangle',
                    routerLink: ['/pages/notfound']
                },
                {
                    label: 'Page vide',
                    icon: 'pi pi-ban',
                    routerLink: ['/pages/empty']
                }
            ]
        }
    ];
}

}
