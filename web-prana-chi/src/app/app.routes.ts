import {Routes} from '@angular/router';
import { LandingComponent } from './General/landing/landing.component';
import { ActividadesComponent } from './General/actividades/actividades.component';
import { ConocenosComponent } from './General/conocenos/conocenos.component';
import { ProfileComponent } from './Users/profile/profile.component';
import { DocumentosComponent } from './Users/documentos/documentos.component';
import { NotificationsComponent } from './Users/notifications/notifications.component';
import { PagosComponent } from './Users/pagos/pagos.component';
import { ActivitiesComponent } from './Users/activities/activities.component';
import { authGuard } from './auth.guard';


export const routes: Routes = [
    {path: 'oferta-actividades', component: ActividadesComponent},
    {path: 'conocenos', component: ConocenosComponent},
    {path: 'pagos', component: PagosComponent, canActivate: [authGuard]},
    {path: 'perfil', component: ProfileComponent, canActivate: [authGuard]},
    {path: 'actividades', component: ActivitiesComponent, canActivate: [authGuard]},
    {path: 'documentos', component: DocumentosComponent, canActivate: [authGuard]},
    {path: 'notificaciones', component: NotificationsComponent, canActivate: [authGuard]},
    {path: '**', component: LandingComponent}
];