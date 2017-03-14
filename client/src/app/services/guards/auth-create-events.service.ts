import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { SessionService } from '../auth/session.service';

@Injectable()
export class AuthCreateEventsService implements CanActivate {

  constructor (private session: SessionService){}

  canActivate() {
    return this.session.isLoggedIn();
    //return true;
  }
}
