import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ActivitiesService {
  BASE_URL: string = 'http://localhost:3000';

  constructor(private http: Http) {}

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  getActivities() {
    return this.http.get(`${this.BASE_URL}/api/activity`)
      .map((res) => res.json());
  }

  create(activity) {
    return this.http.post(`${this.BASE_URL}/api/activity`, activity)
      .map(res => res.json())
      .catch(this.handleError);
  }
  get(id) {
    return this.http.get(`${this.BASE_URL}/api/activity/${id}`)
      .map((res) => res.json());
  }
  edit(id, activity) {
    return this.http.put(`${this.BASE_URL}/api/activity/${id}`, activity)
      .map((res) => res.json());
  }

  remove(id) {
    return this.http.delete(`${this.BASE_URL}/api/activity/${id}`)
      .map((res) => res.json());
  }

}
