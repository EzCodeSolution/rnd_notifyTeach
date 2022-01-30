import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LineNotifyServiceService {

  errorData : {} | undefined;
  
  countSend : number | undefined;

  constructor(private http: HttpClient) { }

  sendLineNotify(data : string){

    const headers = new HttpHeaders()
    headers.append("Authorization",`Bearer ${environment.lineApiKey}`)
    .append("Content-Type", 'application/x-www-form-urlencoded');
    const options = {headers : headers}
    

    const params = new URLSearchParams();
    params.append("message", data)

    if(this.checkCanSendNotify()){
      return this.errorData = "ไม่สามารถส่งข้อความได้กรุณารอเวลาเเละลองใหม่"
    }else { 
      return this.http.post("/",params.toString(),options).subscribe();
    }
  }

  private checkCanSendNotify(){
    return false;
  }

}
