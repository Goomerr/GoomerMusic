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
  public audio!: HTMLAudioElement //<audio/>
  public timeElapsed$: BehaviorSubject<string> = new BehaviorSubject('00:00')
  public timeRemaining$: BehaviorSubject<string> = new BehaviorSubject('-00:00')
  public playerStatus$: BehaviorSubject<string> = new BehaviorSubject('paused')
  public playerPorcentage$: BehaviorSubject<number> = new BehaviorSubject(0)

  constructor() {
    this.audio = new Audio()
    this.trackInfo$.subscribe(responseOK => {
      if (responseOK) {
        // console.log('💥💢💢💌', responseOK)
        this.setAudio(responseOK)
      }
      this.listenAllEvents()
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
    this.audio.addEventListener('timeupdate', this.calculateTime, false)
    this.audio.addEventListener('timeupdate', this.calculateTime, false)
    this.audio.addEventListener('playing', this.setPlayerStatus, false)
    this.audio.addEventListener('playing', this.setPlayerStatus, false)
    this.audio.addEventListener('play', this.setPlayerStatus, false)
    this.audio.addEventListener('pause', this.setPlayerStatus, false)
    this.audio.addEventListener('pause', this.setPlayerStatus, false)
    this.audio.addEventListener('ended', this.setPlayerStatus, false)
  }
  private setPlayerStatus = (state: any) => {
    console.log(state)
    switch (state.type) {
      case 'play':
        this.playerStatus$.next('play')
        break
      case 'playing':
        this.playerStatus$.next('playing')
        break
      case 'ended':
        this.playerStatus$.next('ended')
        break
      default:
        this.playerStatus$.next('paused')
    }

  }

  private calculateTime = () => {
    // console.log('Disparando evento...-')
    const { duration, currentTime } = this.audio
    //console.table([duration, currentTime])
    this.setTimeElapsed(currentTime)
    this.setTimeRemaining(currentTime, duration)
    this.setPorcentage(currentTime, duration)
  }

  private setPorcentage(currentTime: number, duration: number): void {
    //duracion de la cancion 100% currentTime x
    //porcentaje = (currentTime * 100) / duration
    let porcentage = (currentTime * 100) / duration;
    this.playerPorcentage$.next(porcentage)
  }

  private setTimeElapsed(currentTime: number): void {
    let seconds = Math.floor(currentTime % 60)// obtener los segundos como numeros enteros
    let minutes = Math.floor((currentTime / 60) % 60)// Obtener los minutos
    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;
    const displayFormat = `${displayMinutes}:${displaySeconds}`
    this.timeElapsed$.next(displayFormat)
  }

  private setTimeRemaining(currentTime: number, duration: number): void {
    let timeLeft = duration - currentTime;
    let seconds = Math.floor(timeLeft % 60)// obtener los segundos como numeros enteros
    let minutes = Math.floor((timeLeft / 60) % 60)// Obtener los minutos
    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;
    const displayFormat = `-${displayMinutes}:${displaySeconds}`
    this.timeRemaining$.next(displayFormat)

  }
  //Funciones Publicas
  public setAudio(track: TrackModel): void {
    //console.log('💔💔🤍', track.url)
    this.audio.src = track.url
    const playPromise = this.audio.play()
    if (playPromise !== undefined) {
      playPromise.then(function () {
        // Automatic playback started!
      }).catch(function (error) {
        // Automatic playback failed.
        // Show a UI element to let the user manually start playback.
      });
    }
  }

  public togglePlayer(): void {
    (this.audio.paused) ? this.audio.play() : this.audio.pause()
  }

  public seekAudio(percentage: number): void {
  //click porcentaje  en la barra de progreso
    const {duration} = this.audio
    //console.log(`Duracion: ${duration}, porcentaje ${percentage}`)
    const percentageToSeconds = (percentage * duration) / 100;
    //console.log(percentageToSeconds)
    this.audio.currentTime = percentageToSeconds
    }


}


