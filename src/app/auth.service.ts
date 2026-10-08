import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authChangeSub = new Subject<boolean>()


  constructor(private http: HttpClient,private jwtHelper: JwtHelperService) { }


  private apiUrl = 'http://localhost:5008/api/v1.0';
  login(email: string, password: string): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/Accounts`,
      {
        email,
        password
      },
      {
        withCredentials: true
      }
    );
  }

  sendAuthStateChangeNotification (isAuthenticated: boolean) {
    this.authChangeSub.next(isAuthenticated);
  }

  isUserAuthenticated (): boolean {
    const token = localStorage.getItem("token");
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  getCurrentUser() {
    const token = localStorage.getItem("token") || '';
    const decodedToken = this.jwtHelper.decodeToken(token);
    console.log(decodedToken);
    const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    const name = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    const email = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
    const user = {
      name: name,
      email: email,
      role: role
    };
    return user;
  }


  //Cookie
  // getProducts(): Observable<Product[]> {
  //   return this.http.get<Product[]>(
  //     `${this.apiUrl}/Accounts`,
  //     {
  //       withCredentials: true
  //     }
  //   );
  // }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.apiUrl}/Accounts`,
    );
  }
}



export interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }