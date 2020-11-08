import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
  focus: any;
  focus1: any;

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor(config: NgbCarouselConfig) {
    config.interval = 5000;    
    config.keyboard = false;
    config.pauseOnHover = false;
    
   }

  ngOnInit() {}

}
