
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TrackModel } from '@core/models/tracks.model';


@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private readonly URL = environment.api

  constructor(private http: HttpClient) {

  }

  //Función para filtrar por id
  private skipById(listTracks: TrackModel[], id: number): Promise<TrackModel[]> {
    return new Promise((resolve, reject) => {
      const listTmp = listTracks.filter(a => a._id !== id)
      resolve(listTmp)
    })
  }

  //Devolver todas las canciones
  getAllTracks$(): Observable<any> {
    return this.http.get(`${this.URL}/tracks`)
      .pipe(
        map(({ data }: any) => {
          return data
        })
      )
  }

  //Canciones aleatorias
  getAllRamdom$(): Observable<any> {
    return this.http.get(`${this.URL}/tracks`)
      .pipe(
        //tap(data => console.log('💛🧡',data)),//antes del filtro 8 datos
        mergeMap(({ data }: any) => this.skipById(data, 1)),
        // map(( dataRevertida ) => {
        //   return dataRevertida.filter((track: TrackModel) => track._id !== 1)//filtro comun de array, filtrar un registro pro su id
        // }),
        //tap(data => console.log('🟡🟠🟡🟡',data)),//despues del filtro 7 datos
        catchError((err) => {
          console.log('Hubo un Error', err)
          return of([])
        })
        )
  }
}
