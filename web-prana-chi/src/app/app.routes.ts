import {Routes} from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { ConocenosComponent } from './conocenos/conocenos.component';

export const routes: Routes = [
    {path: 'actividades', component: ActividadesComponent},
    {path: 'conocenos', component: ConocenosComponent},
    {path: '**', component: LandingComponent}
];
