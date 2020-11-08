import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'app/auth/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
  focus: any;
  focus1: any;

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  contactus;

  constructor(private ngxService: NgxUiLoaderService,config: NgbCarouselConfig, public userservice: UserService) {
    config.interval = 5000;
    config.keyboard = false;
    config.pauseOnHover = false;

  }

  ngOnInit() {
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
