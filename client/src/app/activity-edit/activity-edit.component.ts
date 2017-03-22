import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from '../services/activities/activities.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-activity-edit',
  templateUrl: './activity-edit.component.html',
  styleUrls: ['./activity-edit.component.css'],
  providers: [ActivitiesService]
})
export class ActivityEditComponent implements OnInit {

  formInfo = {
    title: '',
    type: '',
    city:'',
    description:'',
  };
  activity: any;
  activityID: string;

  constructor(
    private service: ActivitiesService,
    private router: Router,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
     this.activityID = params['id'];
     this.getActivityDetails(this.activityID);
   });

    }


  getActivityDetails(id) {
   this.service.get(id)
     .subscribe((activity) => {
       this.activity = activity;
     });
 }

  submitForm(theForm){
    this.service.edit(this.activityID,this.formInfo)
      .subscribe((activity) => {
       this.router.navigate(['/activity/'+this.activityID]);
      });

    }
}
