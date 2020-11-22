import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { SigninComponent } from './signin/signin.component';
import { BookingComponent } from './booking/booking.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { OrdersummaryComponent } from './ordersummary/ordersummary.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule,} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        MatCheckboxModule,MatExpansionModule,MatRadioModule,MatInputModule,MatDatepickerModule,MatNativeDateModule,MatCardModule
    ],
    declarations: [
        LandingComponent,
        SignupComponent,
        ProfileComponent,
        AboutComponent,
        ContactComponent,
        SigninComponent,
        BookingComponent,
        OrdersummaryComponent,
    ]
})
export class ExamplesModule { }
