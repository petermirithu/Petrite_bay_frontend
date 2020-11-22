import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/auth/user.service';
import { ProductsService } from 'app/products/products.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  dogWalking = { name: 'Dog Walking', selected: false, dog_size: null, hours: 0, unit: 0.00, cost: 0.00 }
  dogGrooming = { name: 'Dog Grooming', selected: false, dog_breed: null, sessions: [], cost: 300.00 }
  petSitting = { name: 'Pet Sitting', selected: false, dog_breed: null, days: 0, unit: 500.00, cost: 0.00 }
  information = { user_id: this.userservice.user_current.id, date: null, placeInfo: null, total: 0.00 }

  constructor(private userservice: UserService, private router: Router, public productservice: ProductsService) { }

  ngOnInit() {
  }

  calculateTotal() {
    let total = 0
    if (this.dogWalking.selected == true) {
      total+=this.dogWalking.cost      
    }
    if(this.dogGrooming.selected == true) {      
      total+=this.dogGrooming.cost
    }
    if(this.petSitting.selected == true) {
      total+=this.petSitting.cost      
    }

    this.information.total = total
  }

  enterSittingDays(data) {
    this.petSitting.days = data
    this.petSitting.cost = this.petSitting.unit * this.petSitting.days
    this.calculateTotal()
  }

  addSession(event) {    

    if (event.checked == true) {
      this.dogGrooming.sessions.push(event.source.value)
    }
    else {
      let index = this.dogGrooming.sessions.indexOf(event.source.value)
      this.dogGrooming.sessions.splice(index, 1)
    }
    this.calculateTotal()
  }

  totalDogWalkingCost() {
    this.dogWalking.cost = this.dogWalking.hours * this.dogWalking.unit
    this.calculateTotal()
  }
  setDogSize(event) {
    if (event.value == "Small sized i.e. less than 22lb (10kg)") {
      this.dogWalking.dog_size = event.value
      this.dogWalking.unit = 200
      this.totalDogWalkingCost()
    }
    else if (event.value == "Medium sized i.e. 22lb - 55lb (10-25kg)") {
      this.dogWalking.dog_size = event.value
      this.dogWalking.unit = 300
      this.totalDogWalkingCost()
    }
    else if (event.value == "Large sized i.e. over 55lb (25kg)") {
      this.dogWalking.dog_size = event.value
      this.dogWalking.unit = 400
      this.totalDogWalkingCost()
    }
  }

  enterWalkingHours(data) {
    this.dogWalking.hours = data
    this.totalDogWalkingCost()
  }

  checkWalking(event) {
    this.dogWalking.selected = event.checked
    this.calculateTotal()
  }
  checkGrooming(event) {
    this.dogGrooming.selected = event.checked
    this.calculateTotal()
  }
  checkSitting(event) {
    this.petSitting.selected = event.checked
    this.calculateTotal()
  }

  confirmBooking(){
    for(let item in this.information){
      if(this.information[item] == null || this.information[item] == 0 || this.information[item]== ''){
        alert("Please fill in all the fields.")
        return        
      }      
    }
        
    if (this.dogWalking.selected == true) {
      this.information["dogWalking"]=this.dogWalking    
    }
    if(this.dogGrooming.selected == true) {      
      this.information["dogGrooming"]=this.dogGrooming
    }
    if(this.petSitting.selected == true) {
      this.information["petSitting"]=this.petSitting
    }
    
    this.productservice.makeBooking(this.information).subscribe(
      success => {
        alert(success)
        this.router.navigate(['home']);   
      },
      error => {
        console.log(error)
        alert("Error during booking. Try again.")
      }
    )
  }
}
