import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Horario } from 'src/app/interfaces/horario.interface';
import { ServiciosService } from 'src/app/services/servicios.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css'],
})
export class ResultadosComponent implements OnInit, AfterViewInit {
  @ViewChild('divExportar') divParaExportar!: ElementRef;
  diasDelMes: number[] = Array(31)
    .fill(0)
    .map((x, i) => i);
  horario: Horario = {};
  year: number = new Date().getFullYear();
  nombre: string = this.service.getNombre() || '';
  firma: string =
    this.service.getNombre()?.split(' ').length == 1
      ? ` ${this.service.getNombre()?.split(' ')[0]}`
      : ` ${this.service.getNombre()?.split(' ')[0]} ${
          this.service.getNombre()?.split(' ')[1].toUpperCase
        }` || '';
  nombreEmpres: string = this.service.getNombreEmpresa() || '';
  mesesTrabajo: string[] = this.service.getmesesdeTrabajo();
  diasMes = new Date(this.year).getDate();
  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private service: ServiciosService
  ) {
    //document.documentElement.style.setProperty('--azul','white');
  }
  ngOnInit(): void {
    this.router.queryParams.subscribe((params) => {
      const parametros = params['objeto'];
      this.horario = JSON.parse(parametros);
    });
    console.log(this.horario);
  }
  obtenerFechaFormato(mes: string): string[] {
    let formato: string[] = [];
    let mesesYear = [
      'ENERO',
      'FEBRERO',
      'MARZO',
      'ABRIL',
      'MAYO',
      'JUNIO',
      'JULIO',
      'AGOSTO',
      'SEPTIEMBRE',
      'OCTUBRE',
      'NOVIEMBRE',
    ];

    let mesNumber = mesesYear.indexOf(mes.toUpperCase()) + 1;
    let diasMes = new Date(this.year, mesNumber, 0).getDate();
    let diasSemana = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
    ];

    for (let dia = 1; dia <= diasMes; dia++) {
      // Ojo, hay que restarle 1 para obtener el mes correcto
      let indice = new Date(this.year, mesNumber - 1, dia).getDay();
      formato.push(`${dia}/${mesNumber}/${this.year}`);
      console.log(
        `El día número ${dia} del mes ${mesNumber} del año ${this.year} es ${diasSemana[indice]}`
      );
    }
    return formato;
  }
  obtenerHoraEntrada(fecha: string) {
    const fechaPartes = fecha.split('/');
    const fechaObj = new Date(
      parseInt(fechaPartes[2]),
      parseInt(fechaPartes[1]) - 1,
      parseInt(fechaPartes[0])
    );
    const diasSemana = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
    ];
    const indice = fechaObj.getDay();
    const dia = diasSemana[indice];
    return this.horario[dia]?.entrada || '-------';
  }
  obtenerHoraSalida(fecha: string) {
    const fechaPartes = fecha.split('/');
    const fechaObj = new Date(
      parseInt(fechaPartes[2]),
      parseInt(fechaPartes[1]) - 1,
      parseInt(fechaPartes[0])
    );
    const diasSemana = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
    ];
    const indice = fechaObj.getDay();
    const dia = diasSemana[indice];
    return this.horario[dia]?.salida || '-------';
  }

  ngAfterViewInit() {
    // Generar y descargar automáticamente el PDF cuando el HTML esté listo
    this.exportarAPDF();
    this.route.navigate(['/fin']);
  }

  exportarAPDF() {
    const doc = new jsPDF({
      orientation: 'landscape', // Orientación horizontal
      unit: 'mm',
      format: 'a4',
    });
    const content = this.divParaExportar.nativeElement;

    html2canvas(content).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = doc.internal.pageSize.getWidth() + 10; // Aumentar 50 mm (5 cm)
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Generar el PDF ajustado al contenido del div sin escalado
      doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      // Guardar el PDF
      doc.save('control_horarios.pdf');
    });
  }
}
