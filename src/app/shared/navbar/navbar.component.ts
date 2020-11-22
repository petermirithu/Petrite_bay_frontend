import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { UserService } from 'app/auth/user.service';
import { Router } from '@angular/router';
import { ProductsService } from 'app/products/products.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;

    user;
    cart;

    constructor(private userservice: UserService, private router: Router, public location: Location, private element: ElementRef, public productservice: ProductsService) {
        this.sidebarVisible = false;
    }

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        this.user = this.userservice.user_current
        this.productservice.cartservice_variable.subscribe(c_variable => this.cart = c_variable)
    }

    signout() {
        if (confirm("Are you sure you want to log out? ")) {
            this.userservice.logout()
            window.open('/home', '_self');
        }
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        // console.log(toggleButton, 'toggle');

        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

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

}
