import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/auth/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactus;

  constructor(private ngxService: NgxUiLoaderService,public userservice: UserService) { }

  ngOnInit(){
    this.contactus = { name: null, email: null, message: null, subject: null }
  }

  sendMessage() {
    let complete = false
    this.ngxService.start();               

    for (let item in this.contactus) {
      if (this.contactus[item] == null || this.contactus[item] == '') {
        this.ngxService.stop(); 
        alert("Please fill in all fields")
        complete = false
        break
      }
      else {
        complete = true
      }
    }

    if (complete == true) {
      this.userservice.send_message(this.contactus).subscribe(
        success => {
          this.ngxService.stop(); 
          alert("Message send successfully. We shall get back you soon.")
        },
        error => {
          this.ngxService.stop(); 
          console.log(error)
          alert("Error sending message")
        }
      )
    }
    else{
      this.ngxService.stop(); 
    }
  }

}
