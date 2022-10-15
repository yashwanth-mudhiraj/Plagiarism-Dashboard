import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {
  profileJson: string = "";
  // imageSrc = 'https://lh3.googleusercontent.com/a-/AOh14GjX2nrOpE4JHqEVNT4p0wiug6swfK8jEsXsmj42Tak=s96-c'

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(
      (profile) => (this.profileJson = JSON.stringify(profile,null,2))
    )
  }

}
