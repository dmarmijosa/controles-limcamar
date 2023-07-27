import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent  {
  @ViewChild('nombreInput') nombreInput!: ElementRef;
  nombre: string = '';
  constructor(private servicio: ServiciosService, private router:Router) {
    this.nombre=this.servicio.getNombre() || '';
  }

  
  validarNombre() {
    const contieneNumeros = /\d/.test(this.nombre);
    if (contieneNumeros || this.nombre.length <= 3) {
      console.log('no validp');
      return;
    }
    this.servicio.setNombre(this.nombre);
    this.router.navigate(['/empresa'])
    
  }
}
