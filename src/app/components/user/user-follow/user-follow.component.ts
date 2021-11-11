import { Component, Input, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-user-follow',
  templateUrl: './user-follow.component.html',
  styleUrls: ['./user-follow.component.css']
})
export class UserFollowComponent implements OnInit {

  following: boolean = false;
  private _idUser: number;

  constructor(private userService: UserServiceService) { }

  ngOnInit(): void {
    this.userService.verFollowUser(this._idUser).subscribe(
      data => {
        data ? this.following = true : this.following = false;
      }
    );
  }

  follow(): void{
    this.following = !this.following;
    if(this.following){
      
      this.userService.followUser(this._idUser).subscribe();
    }else{

      alert("DENTRO DE ELSE: " + this._idUser);
      this.userService.unFollowUser(this._idUser).subscribe();
    }
  }

  public get idUser(): number {
    return this._idUser;
  }

  @Input()
  public set idUser(value: number) {
    this._idUser = value;
  }
}
