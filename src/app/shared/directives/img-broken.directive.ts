import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]'
})
export class ImgBrokenDirective {
//Host
@Input() customImg: string = ''
@HostListener('error')handleError(): void {

  const elNative = this.elHost.nativeElement
    console.log('🔴 Esta imagen revento -->', this.elHost);
    elNative.src = this.customImg
}
  constructor(private elHost: ElementRef) {
   //console.log(this.elHost)
  }

}
