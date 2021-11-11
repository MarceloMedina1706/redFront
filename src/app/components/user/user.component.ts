import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { TokenService } from 'src/app/service/token.service';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User = null;
  profile: boolean = false;
  idUser: number;

  constructor(
    private userService: UserServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService
    ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    if(id == null){
      this.userService.getUser().subscribe(
        data => {
          this.user = data;
          this.profile = this.isUserProfile(data.email);
        }
      );
    }else{
      this.userService.getUserById(id).subscribe(
        data => {
          this.user = data;
          this.profile = this.isUserProfile(data.email);
          this.idUser = data.idUser;
          if(this.profile) this.router.navigate(["/user"]);
        }
      );
    }

  }


  private isUserProfile(email: string): boolean{
    return email == this.tokenService.getEmail();
  }
}
