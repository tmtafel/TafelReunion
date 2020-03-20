import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, NavigationExtras, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../auth/services/auth.service';
import { ProfileService } from '../auth/services/profile.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private profileService: ProfileService, private authService: AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url: string = state.url;
    return this.checkAdmin(url);
  }
  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(next, state);
  }

  canLoad(route: Route): boolean {
    const url = `/${route.path}`;
    return this.checkAdmin(url);
  }

  checkAdmin(url: string): boolean {
    if (this.authService.isLoggedIn()) {
      if (this.profileService.isAdmin()) {
        return true;
      }
    }
    this.authService.logout().finally(() => {
      const sessionId = Math.floor(Math.random() * 99999) + 10001;
      const navigationExtras: NavigationExtras = {
        queryParams: {
          session_id: sessionId
        },
        fragment: 'anchor'
      };
      this.router.navigate(['/login'], navigationExtras);
    });
    return false;
  }
}
