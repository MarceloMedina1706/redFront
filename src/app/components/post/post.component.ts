import { Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import { Post } from 'src/app/model/post';
import { PostServiceService } from 'src/app/service/post-service.service';
import { PostComentariosComponent } from './post-comentarios/post-comentarios.component';

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

  @Output() displayEvent = new EventEmitter<number>();
  receiveDisplay($event){
    this.displayEvent.emit($event);
  }

  @Output() delEvent = new EventEmitter<number>();
  receiveDel(): void{
    this.postService.deletePost(this._post.idPost).subscribe(
      data => {
        if(data)
          this.delEvent.emit(this._post.idPost);
      }
    );
    
  }

  @ViewChild(PostComentariosComponent) appComentarios: PostComentariosComponent;

  private _post: Post;
  public get post(): Post {
    return this._post;
  }
  @Input() public set post(value: Post) {
    this._post = value;
  }

  private verLike(likes): boolean{
    if(likes.indexOf(this._post.idPost) < 0){
      return false;
    }else{
      return true;
    }
  }
}
