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

  /**
   * verifica si hay datos almacenados en local sotrage, en caso que existan los bindea con personalData
   */
  ngOnInit(): void {
    const personalDataJSON = localStorage.getItem('personalDataForm')
    if (personalDataJSON != null) {
      this.personalData = { ...JSON.parse(personalDataJSON) }
    }
    this.getPais();
  }

  /**
   * Trae del backend los paises disponibles para el select nacionalidad
   */
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

  /**
   * Muestra por consola el error del get
   * @param error 
   */
  handleError(error: any): void {
    console.log("error al obtener datos", error);
  }

  /**
   * Guarda en local storage los datos del formulario
   */
  send(): void {
    console.log(this.personalData);
    const personalDataJSON = JSON.stringify(this.personalData);
    localStorage.setItem('personalDataForm', personalDataJSON);
  }

  /**
   * calcula una fecha de nacimiento usando dos datos: el día de hoy y una entero que determina los años hacia atrás
   * este datos e usa para los limites de la fecha de nacimineto del input del calendario
   * @param years años 
   * @returns un string con la fecha
   */
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
