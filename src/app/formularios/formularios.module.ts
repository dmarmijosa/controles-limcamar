import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioComponent } from './formulario/formulario.component';
import { FormsModule } from '@angular/forms';
import { CentroTrabajoComponent } from './centro-trabajo/centro-trabajo.component';
import { MesesDeTrabajoComponent } from './meses-de-trabajo/meses-de-trabajo.component';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { HorarioComponent } from './horario/horario.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { FinComponent } from './fin/fin.component';

@NgModule({
  declarations: [
    FormularioComponent,
    CentroTrabajoComponent,
    MesesDeTrabajoComponent,
    HorarioComponent,
    ResultadosComponent,
    FinComponent,
  ],
  imports: [CommonModule, FormsModule, RouterModule, NgSelectModule],
  exports: [
    FormularioComponent,
    CentroTrabajoComponent,
    MesesDeTrabajoComponent,
  ],
})
export class FormulariosModule {}
