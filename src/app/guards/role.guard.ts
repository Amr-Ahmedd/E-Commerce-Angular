import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { UserStorage } from '../services/storage/user-storage';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const expectedRole = route.data['role'] as 'ADMIN' | 'CUSTOMER';
    const token = UserStorage.getToken();

    if (!token) return this.router.parseUrl('/login');

    const role = UserStorage.getUserRole();
    if (role !== expectedRole) {
      // send them to the correct dashboard
      if (role === 'ADMIN') return this.router.parseUrl('/admin/dashboard');
      if (role === 'CUSTOMER') return this.router.parseUrl('/customer/dashboard');
      return this.router.parseUrl('/login');
    }

    return true;
  }
}
