import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
  }
  onLogout(): void{
    this.tokenService.logOut();
  }
}
