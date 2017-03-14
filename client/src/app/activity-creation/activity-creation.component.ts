import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from '../services/activities/activities.service';
import { SessionService } from '../services/auth/session.service';
import { AuthCreateEventsService } from '../services/guards/auth-create-events.service';


@Component({
  selector: 'app-activity-creation',
  templateUrl: './activity-creation.component.html',
  styleUrls: ['./activity-creation.component.css'],
  providers: [ ActivitiesService, SessionService, AuthCreateEventsService ]
})
export class ActivityCreationComponent implements OnInit {
  user: any;
  error: string;

  activity: any;
  newActivity = {
    title: '',
    type: '',
    city:'',
    description:'',
    image:''
  };


  constructor(private session: SessionService, private entry: ActivitiesService) { }

  ngOnInit() {
  }
  addActivity(){
  this.entry.create(this.newActivity)
  .subscribe(
    (activity) =>
    this.activity = activity);
  }
}
