import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from '../services/activities/activities.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-activity-single',
  templateUrl: './activity-single.component.html',
  styleUrls: ['./activity-single.component.css'],
   providers: [ActivitiesService]
})
export class ActivitySingleComponent implements OnInit {
  activity: any;

  constructor(
    private service: ActivitiesService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getActivityDetails(params['id']);
    });

  }

  getActivityDetails(id) {
   this.service.get(id)
     .subscribe((activity) => {
       this.activity = activity;
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
}
