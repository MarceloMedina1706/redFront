import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CommentDTO } from 'src/app/dto/comment-dto';
import { Comentario } from 'src/app/model/comentario';
import { Post } from 'src/app/model/post';
import { PostServiceService } from 'src/app/service/post-service.service';
import { ModalComponent } from '../modal/modal.component';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(
    private postService: PostServiceService) { }

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
  
  @ViewChild("modal") appModal: ModalComponent;
  receiveDisplay($event): void{
    this.appModal.idPost = $event;
    this.appModal.openModal();
  }

  receiveComment($event): void {
    let commentDTO = $event;
    this.postService.commentPost(commentDTO).subscribe(
      data => {
        this.addComment(commentDTO.idPost, data);
      }
    );
  }

  receiveDel($event): void{
    this.removePost($event);
  }

  @ViewChildren(PostComponent) postsChildren: QueryList<PostComponent>//PostComponent[];
  private addComment(idPost: number, comment: Comentario): void{
    this.postsChildren.forEach(pc => {
      if(pc.post.idPost == idPost){
        pc.appComentarios.addComment(comment);
      }
    });
  }

  private removePost(idPost: number): void{
    let index = 0, position;
    this.posts.forEach(pc => {
      if(pc.idPost == idPost){
        position = index;
      }
      index++;
    });
    this.posts.splice(position, 1);
  }

  //--------------------------------------------------------------
}
