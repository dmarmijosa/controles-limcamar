import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormularioComponent } from './formularios/formulario/formulario.component';
import { CentroTrabajoComponent } from './formularios/centro-trabajo/centro-trabajo.component';
import { MesesDeTrabajoComponent } from './formularios/meses-de-trabajo/meses-de-trabajo.component';
import { HorarioComponent } from './formularios/horario/horario.component';
import { ResultadosComponent } from './formularios/resultados/resultados.component';
import { FinComponent } from './formularios/fin/fin.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'nombre-empleado',
    component: FormularioComponent,
  },
  {
    path: 'empresa',
    component: CentroTrabajoComponent,
  },
  {
    path: 'meses-trabajo',
    component: MesesDeTrabajoComponent,
  },
  {
    path: 'horario',
    component: HorarioComponent,
  },
  {
    path: 'resultado',
    component: ResultadosComponent,
  },
  {
    path:'fin',
    component:FinComponent
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
