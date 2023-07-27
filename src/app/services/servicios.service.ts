import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor() { }

  getNombre(){
    return localStorage.getItem('nombre');
  }

  setNombre(valor:string){
     localStorage.setItem('nombre',valor);
  }
  getNombreEmpresa(){
    return localStorage.getItem('empresa');
  }

  setNombreEmpresa(valor:string){
     localStorage.setItem('empresa',valor);
  }
  
  getmesesdeTrabajo():string[]{
    return localStorage.getItem('meses')?.split(' ') || []
  }
  setMesesdeTrabajo(meses:string[]){
    localStorage.setItem('meses',meses.join(' '))
  }


}
