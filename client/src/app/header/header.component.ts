import { Component, OnInit, Injectable } from '@angular/core';
import { SessionService } from '../services/auth/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],

})
export class HeaderComponent implements OnInit {
  user: any;

  constructor(public session: SessionService, private router: Router) { }

  ngOnInit() {
    console.log("HEADER COMPONENT");
    this.session.getLoginEventEmitter().subscribe((user) => console.log("LOOGGIN"));
    this.session.isLoggedIn().subscribe((user) => this.successCb(user));
  }

  logout() {
   this.session.logout()
     .subscribe(
       () => {this.user = null; this.router.navigate(['/']);},
     );
   }

  errorCb(err) {
    this.user.username = 'not logged in';
  }

  successCb(user) {
    this.user = user;
  }
}
