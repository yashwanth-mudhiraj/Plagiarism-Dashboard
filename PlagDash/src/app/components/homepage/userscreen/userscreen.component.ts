import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-userscreen',
  templateUrl: './userscreen.component.html',
  styleUrls: ['./userscreen.component.scss']
})
export class UserscreenComponent implements OnInit {

  profileJson: string = "";

  isSideNavCollapsed = false;
  screenWidth = 0;

  constructor(public auth:AuthService) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(
      (profile) => (this.profileJson = JSON.stringify(profile, null, 2)),
    );
  }

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

}
