import { Component, OnInit } from '@angular/core';
import { LineNotifyServiceService } from '../service/line-notify-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private linenotify : LineNotifyServiceService) { }

  ngOnInit(): void {
  }

  onSend(event : string){
    this.linenotify.sendLineNotify("ทดสอบส่งดู");
  }

}
