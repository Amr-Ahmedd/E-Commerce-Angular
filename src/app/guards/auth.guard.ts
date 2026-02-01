import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { UserStorage } from '../services/storage/user-storage';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    const token = UserStorage.getToken();
    if (!token) return this.router.parseUrl('/login');
    return true;
  }
}
