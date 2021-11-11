import { Component, OnInit, Input } from '@angular/core';
import { PostServiceService } from 'src/app/service/post-service.service';

@Component({
  selector: 'app-post-footer',
  templateUrl: './post-footer.component.html',
  styleUrls: ['./post-footer.component.css']
})
export class PostFooterComponent implements OnInit {

  constructor(
    private postService: PostServiceService
  ) { }
  
  

  @Input() active: boolean;

  ngOnInit(): void {
  }

  private _idPost: number = 0;
  public get idPost(): number {
    return this._idPost;
  }
  @Input() public set idPost(value: number) {
    this._idPost = value;
  }

  

  like(): void {
    if(!this.active){
      this.active = true;
      this.postService.likePost(this._idPost).subscribe();
    }else{
      this.active = false;
      this.postService.unLikePost(this.idPost).subscribe();
    }
  }

}
