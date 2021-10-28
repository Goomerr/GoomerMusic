import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly URL = environment.api

  constructor(private http: HttpClient, private cookie: CookieService) { }

  senCredentials(email: string, password: string): Observable<any> {
    //console.log(email, password)
    const body = {
      email,
      password
    }
  return this.http.post(`${this.URL}/auth/login`, body)
    .pipe(
      tap((responseOK: any) => {
        const { tokenSession, data} = responseOK
        this.cookie.set('token_service', tokenSession, 4, '/')
      })
    )
  }
}
