import { Component, OnInit } from '@angular/core';
import {UserService} from '../../auth/user.service'
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  login;

  error;

  constructor(private userservice:UserService) { }

  ngOnInit() {
    this.login={username:'',password:'',};        
  }

  signin(){    
    this.userservice.loginUser(this.login).subscribe(
      success => {              
        window.open('/home', '_self');        
      },
      error => {
        this.error=error    
        console.log(error.error)

        if(error?.error.username){
          alert("Username field can't be blank")
        }
        else if(error?.error.password){
          alert("Password field can't be blank")
        }
        else{
          alert("Wrong Username or Password")
        }        
      }        
    );    
  }    

}
