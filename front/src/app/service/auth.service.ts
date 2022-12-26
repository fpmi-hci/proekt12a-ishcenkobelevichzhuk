import {Injectable} from '@angular/core';
import {catchError, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UnauthorizedUser} from "../domain/unauthorized-user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authRoute = "http://localhost:8088/api/auth/login"

  constructor(private http: HttpClient) {
  }

  signIn(unauthorizedUser: UnauthorizedUser): Observable<UnauthorizedUser> {
    return this.http.post<UnauthorizedUser>(this.authRoute,unauthorizedUser,{withCredentials:true})
  }
}
