import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './core/profile/profile.component';
import { SignupComponent } from './core/signup/signup.component';
import { LandingComponent } from './core/landing/landing.component';
import { AboutComponent} from './core/about/about.component'
import{ContactComponent} from './core/contact/contact.component'
import {SigninComponent} from './core/signin/signin.component'

const routes: Routes =[
    { path: '', redirectTo: 'home', pathMatch: 'full' },    
    { path: 'home',          component: LandingComponent },
    { path: 'user-profile',     component: ProfileComponent },
    { path: 'signup',           component: SignupComponent },    
    { path: 'about',            component:AboutComponent},
    { path: 'contact',           component:ContactComponent},
    { path: 'signin',            component:SigninComponent}

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
