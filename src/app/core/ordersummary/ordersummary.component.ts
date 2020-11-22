import { ThrowStmt } from '@angular/compiler';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/auth/user.service';
import { ProductsService } from 'app/products/products.service';

@Component({
  selector: 'app-ordersummary',
  templateUrl: './ordersummary.component.html',
  styleUrls: ['./ordersummary.component.scss']
})
export class OrdersummaryComponent implements OnInit {

  cart;
  order;

  constructor(private userservice: UserService, private router: Router, public productservice: ProductsService) { }

  ngOnInit() {
    this.order={user_id: this.userservice.user_current.id,email:null,phoneno:null,deliveryInfo:null}
    this.productservice.cartservice_variable.subscribe(c_variable => this.cart = c_variable)
  }


  removeItem(user_id, product_id) {
    this.productservice.removeCart(user_id, product_id, this.userservice.token).subscribe(
      success => {
        alert(success)
        this.productservice.get_cart(this.userservice.user_current.id).subscribe(
          data => {
            this.productservice.update_cart_bar(data)
            this.cart = data
          },
          err => console.log(err),
        )
      },
      err => {
        console.error(err);
      }
    )
  }

  confirmOrder(){    
    if(this.order.email!=null && this.order.phoneno != null && this.order.deliveryInfo != null){
      this.productservice.confirmOrder(this.order).subscribe(
        success => {
          alert(success)
          
          this.productservice.get_cart(this.userservice.user_current.id).subscribe(
            data => {
              this.productservice.update_cart_bar(data)
              this.cart = data
            },
            err => console.log(err),
          )
          this.router.navigate(['home']);        
        },
        error =>{
          console.log(error)
          alert("Error")
        }
      )
    }
    else{
      alert("Please fill in all the fields.")
    }
  }
}
