import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements OnInit {

  constructor(
    private userService: UserServiceService,
    private activatedRoute: ActivatedRoute
  ) {}
 
  result: User[];
  ngOnInit(): void {
    this.search();
  }

  private search(): void{
    this.result = [];
    let search = this.activatedRoute.snapshot.params.search;
    this.userService.getSearch(search).subscribe(
      result => {
        this.result = result;
      }
    );
  }

}
