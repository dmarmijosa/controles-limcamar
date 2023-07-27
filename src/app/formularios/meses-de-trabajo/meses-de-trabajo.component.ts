import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from 'src/app/services/servicios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-meses-de-trabajo',
  templateUrl: './meses-de-trabajo.component.html',
  styleUrls: ['./meses-de-trabajo.component.css'],
})
export class MesesDeTrabajoComponent {
  mesesTrabajo: string[] = [];

  constructor(private services: ServiciosService, private router: Router) {
    this.mesesTrabajo = this.services.getmesesdeTrabajo();
  }

  meses = [
    { name: 'Enero' },
    { name: 'Febrero' },
    { name: 'Marzo' },
    { name: 'Abril' },
    { name: 'Mayo' },
    { name: 'Junio' },
    { name: 'Julio' },
    { name: 'Agosto' },
    { name: 'Septiembre' },
    { name: 'Octubre' },
    { name: 'Noviembre' },
    { name: 'Diciembre' },
  ];
  validar() {
    if (this.mesesTrabajo.length <= 0) {
      Swal.fire({
        title: 'Error',
        text: 'Debes seleccionar al menos un mes',
        icon: 'error',
      });
      return;
    }
    this.services.setMesesdeTrabajo(this.mesesTrabajo.map(dato=>dato.toUpperCase()));
    this.router.navigate(['/horario'])
  }
}
