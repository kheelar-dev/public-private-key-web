import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private cookieService = inject(CookieService);
  username = '';
  password = '';

  login() {
    this.authService
      .login(this.username, this.password)
      .subscribe({
        next: (result) => {
          localStorage.setItem("token", result.token);
          console.log('Login success', result);
          const name = this.authService.getCurrentUser().name;
          const email = this.authService.getCurrentUser().email;
          const role = this.authService.getCurrentUser().role;
          localStorage.setItem("currentUser", email);
          localStorage.setItem("currentRole", role);
          localStorage.setItem("currentUserName", name);
          console.log(localStorage.getItem('token'))
          this.authService.sendAuthStateChangeNotification(result.isAuthSuccessful);

          this.router.navigate(['/product']);
        },
        error: (error) => {
          console.error('Login failed', error);
        }
      });
  }

  getCookie(name: string): string | null {
    const cookies = document.cookie.split(';');
  
    for (const cookie of cookies) {
      const [key, value] = cookie.trim().split('=');
  
      if (key === name) {
        return decodeURIComponent(value);
      }
    }
  
    return null;
  }
}
