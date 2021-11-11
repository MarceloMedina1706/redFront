import { Component, OnInit, Input} from '@angular/core';
import { Comentario } from 'src/app/model/comentario';
import { Post } from 'src/app/model/post';
import { PostServiceService } from 'src/app/service/post-service.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(
    private postService: PostServiceService
  ) { }
  

  like: boolean=false;
  ngOnInit(): void {
    this.postService.getLikes().subscribe(
      data => {
        this.like = this.verLike(data);
      }
    );
  }


  //comentarios: Comentario[] = [];
  private _post: Post;
  public get post(): Post {
    return this._post;
  }
  @Input() public set post(value: Post) {
    this._post = value;
  }
  /*
  private _likes: number[];
  public get likes(): number[] {
    return this._likes;
  }
  public set likes(value: number[]) {
    this._likes = value;
  }*/

  private verLike(likes): boolean{
    if(likes.indexOf(this._post.idPost) < 0){
      return false;
    }else{
      return true;
    }
  }
}
