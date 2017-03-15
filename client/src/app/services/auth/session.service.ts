import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

const BASEURL = "http://localhost:3000";

@Injectable()
export class SessionService {

  loginEmitter : EventEmitter<any>;

  options : Object = { withCredentials : true };

  constructor(private http: Http) {
    this.loginEmitter = new EventEmitter();
  }

  handleError(e) {
    console.error("Error:");
    console.log(e);
    return Observable.throw(e.json().message);
  }

  signup(user) {
    return this.http.post(`${BASEURL}/api/user/signup`, user, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  login(user) {
    return this.http.post(`${BASEURL}/api/user/login`, user, this.options)
      .map((user) => {
        console.log("Emtting login event....");
        this.loginEmitter.emit({user});
        console.log("ahahhahaa....");
        return user;
      })
      .map((res) => res.json())
      .catch(this.handleError);
  }

  getLoginEventEmitter(){
    return this.loginEmitter;
  }

  logout() {
    return this.http.post(`${BASEURL}/api/user/logout`, {}, this.options)
      .map(res => res.json())
      .map(resp => {
        this.loginEmitter.emit(null); return resp; })
      .catch(this.handleError);
  }

  isLoggedIn() {
    return this.http.get(`${BASEURL}/api/user/loggedin`, this.options)
      .map(res => res.json())
      .catch((err) => this.handleError(err));
  }

  getPrivateData() {
    return this.http.get(`${BASEURL}/api/user/private`, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }
}
