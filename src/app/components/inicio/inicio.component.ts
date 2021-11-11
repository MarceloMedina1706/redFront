import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post';
import { PostServiceService } from 'src/app/service/post-service.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private postService: PostServiceService) { }

  ngOnInit(): void {

    this.postService.getPosts().subscribe(
      data => {
        this.posts = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  receivePost($event) {
    this.posts.unshift($event);
  }

  posts: Post[] = [];

  //--------------------------------------------------------------
  display: boolean = false;

  showDialog() {
      this.display = true;
  }


  //--------------------------------------------------------------
}
