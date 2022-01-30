import { Component, OnInit } from '@angular/core';
import { LineNotifyServiceService } from '../service/line-notify-service.service';

import Swal from 'sweetalert2/dist/sweetalert2.js';
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
    let message = "";
    switch(event){
      case 'slow':{
        message = "ช้าลงหน่อย"
        break;
      }
      case 'miss':{
        message = "ไม่ทัน"
        break;
      }
      case 'again':{
        message = "อธิบายอีกรอบ"
        break;
      }
      case 'noprom':{
        message = "ไม่มีปัญหา!"
        break;
      }
      case 'understand':{
        message = "เข้าใจแล้ว!"
        break;
      }
      case 'gonext':{
        message = "ไปต่อได้เลย!"
        break;
      }
    }
      
    this.linenotify.sendLineNotify(message);
    console.log(this.linenotify.errorData)
    if(this.linenotify.errorData == "" || this.linenotify.errorData == undefined){
      Swal.fire({
        icon: 'success',  
        title: 'ส่งข้อความสำเร็จ',  
      });  
    }else{
      Swal.fire({  
        icon: 'error',  
        title: 'ส่งข้อความไม่สำเร็จ',  
        text: `${this.linenotify.errorData}`,  
      })  
    }
  
  }

}
