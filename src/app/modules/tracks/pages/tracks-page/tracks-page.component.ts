import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent implements OnInit, OnDestroy {

  tracksTrending: Array<TrackModel> = []
  tracksRandom: Array<TrackModel> = []

  listObservers$: Array<Subscription> = []

  constructor(private tracksService: TrackService) { }

  ngOnInit(): void {
    this.loadDataAll()
    this.loadDataRandom()
  }
//Cargar las canciones mediante suscribe
  // loadDataAll(): void {
  //   this.tracksService.getAllTracks$()
  //     .subscribe((response: TrackModel[]) => {
  //       this.tracksTrending = response
  //     })
  // }
   loadDataRandom(): void {
    this.tracksService.getAllRamdom$()
      .subscribe((response: TrackModel[]) => {
        this.tracksRandom = response
      }, err => {
        alert('Error de conexion')
        console.log('Error De Conexión')
      })
   }

  //Cargar las canciones como Promise
  async loadDataAll(): Promise<any> {
    this.tracksTrending = await this.tracksService.getAllTracks$().toPromise()
   // this.tracksRandom = await this.tracksService.getAllRamdom$().toPromise()
  }
  ngOnDestroy(): void {

  }
}


