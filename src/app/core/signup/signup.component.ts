import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/auth/user.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    test: Date = new Date();
    focus;
    focus1;
    register;
    error;

    constructor(public userservice: UserService, private router: Router) { }

    ngOnInit() {
        this.register = { username: '', email: "", password1: '', password2: '' };
    }

    signup() {
        if (this.register.email.includes('test@') || this.register.email.includes('_test') || this.register.email.includes('test_') || this.register.email.includes('-test') || this.register.email.includes('test-') || !this.register.email.includes('@')) {
            alert("Please enter a real email")
        }
        else {
            this.userservice.signup(this.register).subscribe(
                success => {
                    window.open('/home', '_self');
                },
                error => {
                    this.error = error
                    if (error?.error.username) {
                        alert("Please provide a Username")
                    }
                    else if (error?.error.email) {
                        alert(error?.error.email[0])
                        //   alert("Please provide or check your email")
                    }
                    else if (error?.error.password1) {
                        alert(error?.error.password1[0])
                    }
                    else if (error?.error.global) {
                        alert(error?.error.global[0])
                    }
                    else {
                        alert('Unable to create an account with the provided details')
                    }
                }
            );
        }
    }
}
