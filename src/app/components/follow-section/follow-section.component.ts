import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-follow-section',
  templateUrl: './follow-section.component.html',
  styleUrls: ['./follow-section.component.css']
})
export class FollowSectionComponent implements OnInit {

  follow: User[];

  constructor(
    private userService: UserServiceService
  ) { }

  ngOnInit(): void {
    this.userService.getFollowingUsers(null).subscribe(
      data => {
        this.follow = data;
      }
    );
    let aFollowing = (document).getElementById("following");
    aFollowing.classList.add("active");
  }

  onFollowing(): void{
    this.userService.getFollowingUsers(null).subscribe(
      data => {
        this.follow = data;
      }
    );
    let aFollowing = (document).getElementById("following");
    let aFollowers = (document).getElementById("followers");
    aFollowing.classList.add("active");
    aFollowers.classList.remove("active");
  }

  onMyFollowers(): void{
    this.userService.getFollowesUsers(null).subscribe(
      data => {
        this.follow = data;
      }
    );
    let aFollowers = (document).getElementById("followers");
    let aFollowing = (document).getElementById("following");
    aFollowers.classList.add("active");
    aFollowing.classList.remove("active");

  }

}
