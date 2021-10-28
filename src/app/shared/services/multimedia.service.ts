import { Injectable, EventEmitter } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { Observable, Observer, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  callBack: EventEmitter<any> = new EventEmitter<any>()

  //myObservable1$: Observable<any> = new Observable()
  //myObservable1$: Subject<any> = new Subject()
  //myObservable1$: BehaviorSubject<any> = new BehaviorSubject('💨💨💨💨')

  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined)
  public audio!: HTMLAudioElement //Audio

  constructor() {
    this.audio = new Audio()
    this.trackInfo$.subscribe(responseOK => {
     if(responseOK){
      console.log('💥💢💢💌', responseOK)
      this.setAudio(responseOK)
     }
    })

    //BehaviorSubject
    // setTimeout(() => {
    //   this.myObservable1$.next('💨💨💨💨')
    // }, 1000)
    // setTimeout(() => {
    //   this.myObservable1$.error('💨💨💨💨')
    // }, 2000)

    //Subject
    // setTimeout(() => {
    //   this.myObservable1$.next('💦💦')
    // }, 1000)
    // setTimeout(() => {
    //   this.myObservable1$.error('💦💦')
    // }, 2000)


    //Observable
    // this.myObservable1$ = new Observable(
    //   (observer: Observer<any>) => {
    //     observer.next('💦')

    //     setTimeout(() => {
    //       observer.complete()

    //     }, 2500)
    //     setTimeout(() => {
    //       observer.next('mas 💦')

    //     }, 2500)
    //     setTimeout(() => {
    //       observer.error('💦')

    //     }, 3500)
    // })

  }

  private listenAllEvents(): void {

  }

  //Funciones Publicas
  public setAudio(track: TrackModel): void{
    console.log('💔💔🤍', track.url)
    this.audio.src = track.url
   const playPromise = this.audio.play()
    if (playPromise !== undefined) {
      playPromise.then(function() {
        // Automatic playback started!
      }).catch(function(error) {
        // Automatic playback failed.
        // Show a UI element to let the user manually start playback.
      });
    }
  }
}
