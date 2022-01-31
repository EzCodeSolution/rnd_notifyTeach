import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})

export class LineNotifyServiceService {

  errorData: {} | undefined;

  countSend: number = 0;

  constructor(private http: HttpClient) { }

  sendLineNotify(data: string) {
    if (this.checkCanSendNotify()) {
      return this.errorData = "นักเรียนได้ส่งข้อความถี่เกินไป รอเวลาอีกครั้งแล้วลองใหม่"
    } else {
      return this.http.post("/sendline", { data: data, lineToken: environment.lineApiKey }).subscribe(() => {
        this.countSend = Number(localStorage.getItem("countSend"));
        if (this.countSend < 3) {
          localStorage.setItem("countSend", (this.countSend + 1).toString())
          let munute = new Date().getMinutes();
          localStorage.setItem("lastSend", munute.toString())
        } else {
          this.errorData = "นักเรียนได้ส่งถี่เกินไป รอเวลาอีกครั้งแล้วลองใหม่"
        }
      });
    }
  }

  private checkCanSendNotify() {
    let countSend = Number(localStorage.getItem("countSend"));
    let lastSend = Number(localStorage.getItem("lastSend") || "");
    let settime = new Date().getMinutes() - lastSend;
    if (countSend >= 3 && settime < 2) {
      return true;
    } else if (countSend >= 3 && settime >= 2 && settime !< 0) {
      localStorage.setItem("countSend", "0")
      localStorage.setItem("lastSend", "")
      this.errorData = ""
      return false;
    }
    else {
      return false;
    }
  }

}
