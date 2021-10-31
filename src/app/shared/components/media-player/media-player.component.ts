import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs';//Programación reactiva

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit, OnDestroy {

  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('')


  // mockCover: TrackModel = {
  //   cover: 'https://i.scdn.co/image/ab67616d0000b27391f7222996c531b981e7bb3d',
  //   album: 'Gioli & Assia',
  //   name: 'BEBE (Oficial)',
  //   url: 'localhost/track.mp3',
  //   _id: 1
  // }


  //Lista de observadores
  listObservers$: Array<Subscription> = []
  state: string = 'paused'

  constructor(public multimediaService: MultimediaService) { }

  ngOnInit(): void {

    const observer1$ = this.multimediaService.playerStatus$
      .subscribe(status => this.state = status)

    this.listObservers$ = [observer1$]

    // this.multimediaService.trackInfo$.subscribe(res => {
    //  // console.log('Reproduciendo esta cancion', res)
    // })

    // const observable1$ = this.multimediaService.myObservable1$
    //   .subscribe(
    //     (responseOk) => {
    //       console.log('Comunicando con multimedia service', responseOk)

    //     },
    //     (responseFail) => {
    //       console.log('fallo con multimedia service', responseFail)

    //     }
    //   )


  }

  ngOnDestroy(): void {
    this.listObservers$.forEach(u => u.unsubscribe())
    // console.log('destruido')
  }

  handlePosition(event: MouseEvent): void {
    const elNative:HTMLElement = this.progressBar.nativeElement
    const {clientX} = event;
    const { x, width} = elNative.getBoundingClientRect()
    const clickX = clientX - x;
    const percentageDFromX = (clickX * 100) / width;
    console.log(`Click(x): ${percentageDFromX}` )
    this.multimediaService.seekAudio(percentageDFromX)
  }
}
