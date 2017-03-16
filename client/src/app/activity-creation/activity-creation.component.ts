import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from '../services/activities/activities.service';
import { SessionService } from '../services/auth/session.service';
import { AuthCreateEventsService } from '../services/guards/auth-create-events.service';
import { FileUploader } from "ng2-file-upload";
import { Router } from '@angular/router';
const BASE_URL: string = "http://localhost:3000/";


@Component({
  selector: 'app-activity-creation',
  templateUrl: './activity-creation.component.html',
  styleUrls: ['./activity-creation.component.css'],
})
export class ActivityCreationComponent implements OnInit {
  user: any;
  error: string;
  feedback: string;
  param : any;
  activity: any;

  uploader: FileUploader = new FileUploader({
     url: `${BASE_URL}api/activity/`
   });

  formInfo = {
    title: '',
    type: '',
    city:'',
    description:''
  };


  constructor(
    private session: SessionService,
    private entry: ActivitiesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.uploader.onSuccessItem = (item, response) => {
        this.feedback = JSON.parse(response).message;
        console.log('activity created:', JSON.parse(response));
        this.router.navigate(['']);
      };
      this.uploader.onErrorItem = (item, response, status, headers) => {
        this.feedback = JSON.parse(response).message;
      };
  }
  submitForm(theForm){
    this.uploader.onBuildItemForm = (item, form) => {
          form.append('title', this.formInfo.title);
          form.append('type', this.formInfo.type);
          form.append('city', this.formInfo.city);
          form.append('description', this.formInfo.description);
        };
        this.uploader.uploadAll()
      }
}
