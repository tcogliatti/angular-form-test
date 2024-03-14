import { Injectable } from '@angular/core';
import { PerfilPostulante } from '../interfaces/PerfilPostulante';
import { HttpClient } from '@angular/common/http';
import { API_BASE, API_PATH, EDADES } from 'src/constants';
import { Pais } from '../interfaces/Paises';
import { TiposDoc } from '../interfaces/TiposDoc';
import { EstadoCivil } from '../interfaces/EstadoCivil';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpcionesService {
  private cachePaises: { [url: string]: any } = {}
  tiposDoc: TiposDoc[] = [];
  tiposEstadoCivil: EstadoCivil[] = [];

  private cache: { [resource: string]: any } = {}; // Objeto para almacenar los datos en caché

  constructor(private http: HttpClient) { }

  getData(url: string): Observable<any> {
    // Verificar si los datos ya están en caché
    if (this.cache[url]) {
      return of(this.cache[url]); // Devolver datos almacenados en caché
    } else {
      // Realizar la llamada a la API externa para obtener los datos
      return this.http.get(url).pipe(
        map((response: any) => {
          this.cache[url] = response; // Almacenar los datos en caché
          return response;
        }),
        catchError((error: any) => {
          console.error('Error al obtener datos de la API:', error);
          return of(null);
        })
      );
    }
  }
}
