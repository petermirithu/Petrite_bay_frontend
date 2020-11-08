import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'app/auth/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

    user;
    profile;
    sub
    user_id

    constructor(private userservice: UserService, private router: Router, private activatedroute: ActivatedRoute,) { }

    ngOnInit() {
        this.sub = this.activatedroute.paramMap.subscribe(params => {
            this.user_id = params.get('id');
        });

        this.getprofile(this.user_id);
    }


    getprofile(user_id) {
        this.userservice.profile(user_id).subscribe(
            data => {
                this.profile = data
            },
            err => console.error(err),
        )
    }

    updateProfile() {
        this.userservice.update_profile(this.profile, this.userservice.token).subscribe(
            success => {
                alert("Successfully updated your profile")
            },
            err => {
                alert('Error updating your profile')
            }
        );
    }


}
