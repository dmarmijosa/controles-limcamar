import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Horario } from 'src/app/interfaces/horario.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css'],
})
export class HorarioComponent {
  error: boolean = false;
  errorHoras: boolean = false;
  constructor(private router: Router) {}
  ordenDias = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
  ];

  dias = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
  ];

  diasSeleccionados = [];

  horario: Horario = {};

  entrada = '';
  salida = '';

  establecerHorario() {
    if (this.diasSeleccionados.length <= 0) {
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 5000);
      return;
    }
    console.log(this.entrada);
    if(!this.entrada || !this.salida){
        this.errorHoras = true;
        setTimeout(() => {
          this.errorHoras = false;
        }, 5000);

        return;
    }
    for (let dia of this.diasSeleccionados) {
      if (!this.horario[dia]) {
        this.horario[dia] = { entrada: this.entrada, salida: this.salida };
      }
    }
    this.entrada = '';
    this.salida = '';
  }
  validar() {
    let horarioOrdenado: Horario = {};
    this.ordenDias.forEach((dia) => {
      if (this.horario[dia]) {
        horarioOrdenado[dia] = this.horario[dia];
      }
    });

    if (Object.keys(this.horario).length === 0) {
      Swal.fire({
        title: 'Error',
        text: 'Debes seleccionar al menos un horario',
        icon: 'error',
      });
      return;
    }
    this.router.navigate(['/resultado'], {
      queryParams: { objeto: JSON.stringify(horarioOrdenado) },
    });
  }
}
