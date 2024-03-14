import { Component, OnInit } from '@angular/core';
import { PerfilPostulante } from '../interfaces/PerfilPostulante';
import { API_BASE, API_PATH, EDADES } from 'src/constants';
import { Pais } from '../interfaces/Paises';
import { TiposDoc } from '../interfaces/TiposDoc';
import { EstadoCivil } from '../interfaces/EstadoCivil';
import { OpcionesService } from '../service/opciones-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-first-form',
  templateUrl: './first-form.component.html',
  styleUrls: ['./first-form.component.css']
})

export class FirstFormComponent implements OnInit {
  personalData: PerfilPostulante;
  paises: Pais[] = [];
  tiposDoc: TiposDoc[] = [];
  tiposEstadoCivil: EstadoCivil[] = [];
  private subscriptions: Subscription[] = [];
  fechaNacimiento: any = {
    maxDate: this.calculateDate(EDADES.MINIMA_EDAD),
    minDate: this.calculateDate(EDADES.MAXIMA_EDAD)
  }

  /**
   * Inicializar el 
   * @paramOpcionService
   */
  constructor(
    private OpcionService: OpcionesService
  ) {
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
      tienehijos: false,
      celular: NaN,
      telefono: NaN,
      mail: '',
      numcalle: NaN,
      provincia: NaN,
      partido: NaN,
      localidad: NaN,
      calle: NaN,
      filesize: NaN,
      otroGenero: '',
      rutacv: '',
      estado: true
    }
  }

  /**
   * verifica si hay datos almacenados en local sotrage, en caso que existan los bindea con personalData
   */
  ngOnInit(): void {
    // obtiene y actualiza adatos desde localStorage
    const personalDataJSON = localStorage.getItem('personalDataForm')
    if (personalDataJSON != null) {
      this.personalData = { ...JSON.parse(personalDataJSON) }
    }

    // obtiene datos para select
    this.subscriptions.push(this.OpcionService.getData(`${API_BASE}/${API_PATH.NACIONALIDAD}`).subscribe(
      data => {
        this.paises = data;
      }));
    this.subscriptions.push(this.OpcionService.getData(`${API_BASE}/${API_PATH.TIPO_DNI}`).subscribe(
      data => {
        this.tiposDoc = data;
      }));
    this.subscriptions.push(this.OpcionService.getData(`${API_BASE}/${API_PATH.ESTADO_CIVIL}`).subscribe(
      data => {
        this.tiposEstadoCivil = data;
      }));
  }
  gnOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
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
