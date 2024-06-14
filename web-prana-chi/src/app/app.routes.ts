import {Routes} from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { ConocenosComponent } from './conocenos/conocenos.component';
import { ProfileComponent } from './profile/profile.component';
import { DocumentosComponent } from './documentos/documentos.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PagosComponent } from './pagos/pagos.component';

export const routes: Routes = [
    {path: 'actividades', component: ActividadesComponent},
    {path: 'conocenos', component: ConocenosComponent},
    {path: 'pagos', component: PagosComponent},
    {path: 'perfil', component: ProfileComponent},
    {path: 'actividades', component: ActividadesComponent},
    {path: 'documentos', component: DocumentosComponent},
    {path: 'notificaciones', component: NotificationsComponent},
    {path: '**', component: LandingComponent}
];
