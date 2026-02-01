import { Component, OnInit, signal } from '@angular/core';
import { UserStorage } from './services/storage/user-storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App implements OnInit{
  protected readonly title = signal('ECommerceWeb');

  isCustomerLoggedIn : boolean = UserStorage.isCustomerLoggedIn();
  isAdminLoggedIn : boolean = UserStorage.isAdminLoggedIn();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      this.isCustomerLoggedIn = UserStorage.isCustomerLoggedIn();
      this.isAdminLoggedIn = UserStorage.isAdminLoggedIn();
    })
  }

  logout(): void {
    UserStorage.signOut ();
    this.router.navigateByUrl('login');
  }

}
