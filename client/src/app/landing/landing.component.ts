import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from '../services/activities/activities.service';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  providers: [ ActivitiesService ]
})
export class LandingComponent implements OnInit {
  activities;
  constructor(private activity: ActivitiesService ) {}

  ngOnInit() {
   this.activity.getActivities()
     .subscribe((activities) => {
       this.activities = activities;
     });
   }
}
