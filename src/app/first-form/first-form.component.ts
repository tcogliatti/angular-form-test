import { Component, OnInit } from '@angular/core';
import { DatosPersonales } from '../interfaces/DatosPersonales';
import { HttpClient } from '@angular/common/http';
import { API_BASE, API_PATH, EDADES } from 'src/constants';
import { Pais } from '../interfaces/Paises';

@Component({
  selector: 'app-first-form',
  templateUrl: './first-form.component.html',
  styleUrls: ['./first-form.component.css']
})

export class FirstFormComponent implements OnInit {
  personalData: DatosPersonales;
  paises: Pais[] = [];
  fechaNacimiento: any = {
    maxDate: this.calculateDate(EDADES.MINIMA_EDAD),
    minDate: this.calculateDate(EDADES.MAXIMA_EDAD)
  }

  constructor(private http: HttpClient) {
    this.personalData = {
      nombres: '',
      apellido: '',
      nombreautopercibido: '',
      fecnac: '',
      nrofiscal: NaN,
      sexo: '',
      pais: '',
      tipoDoc: '',
      nrodoc: NaN,
      estadoCivil: NaN,
      foto: '',
      tienelicencia: false,
      tienehijos: false
    }
  }

  ngOnInit(): void {
    const personalDataJSON = localStorage.getItem('personalDataForm')
    if(personalDataJSON != null){
      this.personalData = { ... JSON.parse(personalDataJSON)}
    }
    this.getPais();
  }
  
  getPais(): void {
    this.http.get<any>(`${API_BASE}/${API_PATH.NACIONALIDAD}`).subscribe(
      (response) => {
        this.paises = response
      },
      (error) => {
        this.handleError(error)
      }
    )
  }

  handleError(error: any): void {
    console.log("error al obtener datos", error);
  }

  send(): void {
    console.log(this.personalData);
    const personalDataJSON = JSON.stringify(this.personalData);
    localStorage.setItem('personalDataForm', personalDataJSON);
  }

  private calculateDate(years: number): string {
    const fechaActual = new Date();
    // Restar X años a la fecha actual
    fechaActual.setFullYear(fechaActual.getFullYear() - years);
    // Formatear la fecha al formato YYYY-MM-DD requerido por el input type="date"
    const yyyy = fechaActual.getFullYear();
    const mm = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const dd = String(fechaActual.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }
}
