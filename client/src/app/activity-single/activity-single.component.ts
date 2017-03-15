import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from '../services/activities/activities.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from '../services/auth/session.service';


@Component({
  selector: 'app-activity-single',
  templateUrl: './activity-single.component.html',
  styleUrls: ['./activity-single.component.css'],
   providers: [ActivitiesService]
})
export class ActivitySingleComponent implements OnInit {
  activity: any;
  user: any;
  error: string;
  activityID: string;

  constructor(
    private service: ActivitiesService,
    private router: Router,
    private route: ActivatedRoute,
    private session: SessionService

  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
     this.activityID = params['id'];
     this.getActivityDetails(this.activityID);
   });
    this.session.isLoggedIn()
      .subscribe(
        (user) => this.successCb(user)
      );
  }

  getActivityDetails(id) {

   this.service.get(id)
     .subscribe((activity) => {
       this.activity = activity;
       console.log("hola",this.activity.participants[0].username)
     });

 }

 deleteActivity() {
  if (window.confirm('Are you sure?')) {
    this.service.remove(this.activity._id)
      .subscribe(() => {
        this.router.navigate(['']);
      });
    }
  }
  addParticipant(){
    this.service.add(this.activityID, this.user).subscribe(
      (activity) =>
      this.router.navigate(['/activity/'+this.activityID])
    );
  }

  successCb(user) {
    this.user = user;
    this.error = null;
  }
}
