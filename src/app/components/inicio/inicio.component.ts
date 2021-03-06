import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { PostDto } from 'src/app/dto/post-dto';
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
  actions:boolean = true;

  //--------------------------------------------------------------
  
  @ViewChild("modal") appModal: ModalComponent;
  receiveDisplay($event): void{
    let idPost = $event.split(".")[0];
    let modal = $event.split(".")[1];
    this.appModal.idPost = idPost;
    switch(modal){
      case 'comment': this.appModal.openModal(modal);
                      break;
      case 'updatePost': this.openModalUpdatePost(modal);
                        break;
    }
    
  }

  receiveComment($event): void {
    let commentDTO = $event;
    this.postService.commentPost(commentDTO).subscribe(
      data => {
        this.addComment(commentDTO.idPost, data);
      }
    );
  }

  idPost: number;
  receiveUpd($event): void{
    let postDto = $event;
    this.postService.updatePost(this.idPost, postDto).subscribe(
      data => {
        if(data)
          this.updatePostComponent(postDto)
      }
    );
  }

  receiveDel($event): void{
    this.removePost($event);
  }

  @ViewChildren(PostComponent) postsChildren: QueryList<PostComponent>;
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

  private openModalUpdatePost(modal: string): void{
    this.postsChildren.forEach(pc => {
      if(pc.post.idPost == this.appModal.idPost){
        this.idPost = this.appModal.idPost;
        this.appModal.contenidoPost = pc.post.contenido;
      }
    });
    this.appModal.openModal(modal);
  }

  private updatePostComponent(postDto: PostDto) {
    this.postsChildren.forEach(pc => {
      if(pc.post.idPost == this.idPost){
        pc.post.contenido = postDto.contenido;
        pc.post.foto = postDto.imagen;
      }
    });
  }

  //--------------------------------------------------------------
}
