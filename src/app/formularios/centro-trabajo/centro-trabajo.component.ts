import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-centro-trabajo',
  templateUrl: './centro-trabajo.component.html',
  styleUrls: ['./centro-trabajo.component.css'],
})
export class CentroTrabajoComponent {
  @ViewChild('nombreInput') nombreInput!: ElementRef;
  nombre_empresa: string = '';
  constructor(private servicio: ServiciosService, private router: Router) {
    this.nombre_empresa = this.servicio.getNombreEmpresa() || '';
  }

  validarEmpresa() {
    const contieneNumeros = /\d/.test(this.nombre_empresa);
    if (contieneNumeros || this.nombre_empresa.length <= 3) {
      return;
    }
    this.servicio.setNombreEmpresa(this.nombre_empresa);
    this.router.navigate(['/meses-trabajo']);
  }
}
