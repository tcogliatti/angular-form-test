import { Component, OnInit } from '@angular/core';
import { PerfilPostulante } from '../interfaces/PerfilPostulante';
import { API_BASE, API_PATH, EDADES } from 'src/constants';
import { OpcionesService } from '../service/opciones-service.service';
import { Subscription } from 'rxjs';
import { Provincia } from '../interfaces/Provincia';
import { Partido } from '../interfaces/Partido';
import { Localidad } from '../interfaces/Localidad';
import { Calle } from '../interfaces/Calle';

@Component({
  selector: 'app-second-form',
  templateUrl: './second-form.component.html',
  styleUrls: ['./second-form.component.css']
})

export class SecondFormComponent implements OnInit {
  personalData: PerfilPostulante;
  provincias: Provincia[] = [];
  partidos: Partido[] = [];
  localidades: Localidad[] = [];
  calles: Calle[] = [];
  private subscriptions: Subscription[] = [];

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
    this.subscriptions.push(this.OpcionService.getData(`${API_BASE}/${API_PATH.PROVINCIA}`).subscribe(
      data => {
        this.provincias = data;
      }));
    this.subscriptions.push(this.OpcionService.getData(`${API_BASE}/${API_PATH.PARTIDO}`).subscribe(
      data => {
        this.partidos = data;
      }));
    this.subscriptions.push(this.OpcionService.getData(`${API_BASE}/${API_PATH.LOCALIDAD}`).subscribe(
      data => {
        this.localidades = data;
      }));
    this.subscriptions.push(this.OpcionService.getData(`${API_BASE}/${API_PATH.CALLE}`).subscribe(
      data => {
        this.calles = data;
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
    this.save();
  }
  save(): void {
    const personalDataJSON = JSON.stringify(this.personalData);
    localStorage.setItem('personalDataForm', personalDataJSON);
  }
}

