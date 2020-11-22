import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'app/auth/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { error } from 'protractor';
import { ProductsService } from '../../products/products.service'

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
  focus: any;
  focus1: any;  

  contactus;

  products;

  cart;

 
 
  constructor(private ngxService: NgxUiLoaderService, config: NgbCarouselConfig, public userservice: UserService, private productservice: ProductsService, private router: Router) {    
    config.interval = 5000;
    config.keyboard = false;
    config.pauseOnHover = false;

  }

  ngOnInit() {
    this.contactus = { name: null, email: null, message: null, subject: null }
    this.getProducts()
    if (this.userservice.user_current) {
      this.cart = { user_id: this.userservice.user_current.id, product_id: null, quantity: 1 }      
    }
    else {
      this.cart = { user_id: null, product_id: null, quantity: 1 }
    }
    
  }

  getProducts() {
    this.productservice.getproducts().subscribe(
      results => {
        this.products = results        
      },
      error => {
        alert("Error")
        console.log(error)
      }
    )
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
    else {
      this.ngxService.stop();
    }
  }

  addToCart(prod_id) {
    if (this.userservice.user_current) {
      this.cart.product_id = prod_id            

      this.productservice.addToCart(this.cart).subscribe(
        success => {                    
          alert(success)
          this.productservice.get_cart(this.userservice.user_current.id).subscribe(
            data => {            
              this.productservice.update_cart_bar(data);
            },
            err => {              
              console.error(err);
            },
          )        
        },
        err => {                    
          console.error(err)
        }
      );    
    }
    else {
      this.router.navigate(['signin']);
    }
  }


}
