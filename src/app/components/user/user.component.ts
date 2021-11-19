import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostDto } from 'src/app/dto/post-dto';
import { Comentario } from 'src/app/model/comentario';
import { Post } from 'src/app/model/post';
import { User } from 'src/app/model/user';
import { PostServiceService } from 'src/app/service/post-service.service';
import { TokenService } from 'src/app/service/token.service';
import { UserServiceService } from 'src/app/service/user-service.service';
import { ModalComponent } from '../modal/modal.component';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User = null;
  profile: boolean = false;
  idUser: number;
  posts: Post[];

  constructor(
    private userService: UserServiceService,
    private postService: PostServiceService,
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
          this.getPosts();
        }
      );
    }else{
      this.userService.getUserById(id).subscribe(
        data => {
          this.user = data;
          this.profile = this.isUserProfile(data.email);
          this.idUser = data.idUser;
          if(this.profile) this.router.navigate(["/user"]);
          this.getPosts();
        }
      );
    }

    
  }

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

  receivePost($event) {
    this.posts.unshift($event);
  }

  receiveDel($event): void{
    this.removePost($event);
  }
  
  //================ACTIONS MODAL====================================================================================
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
  
  //================FIN ACTION MODAL=================================================================================


  private getPosts(): void{
    if(this.profile){
      this.postService.getPostsUserProfile().subscribe(
        data => {
          this.posts = data;
        }
      );
    }else{
      this.postService.getPostsByUser(this.idUser).subscribe(
        data => {
          this.posts = data;
        }
      );
    }
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

  @ViewChildren(PostComponent) postsChildren: QueryList<PostComponent>;
  private openModalUpdatePost(modal: string): void{
    this.postsChildren.forEach(pc => {
      if(pc.post.idPost == this.appModal.idPost){
        this.idPost = this.appModal.idPost;
        this.appModal.contenidoPost = pc.post.contenido;
      }
    });
    this.appModal.openModal(modal);
  }
  
  private addComment(idPost: number, comment: Comentario): void{
    this.postsChildren.forEach(pc => {
      if(pc.post.idPost == idPost){
        pc.appComentarios.addComment(comment);
      }
    });
  }

  private updatePostComponent(postDto: PostDto) {
    this.postsChildren.forEach(pc => {
      if(pc.post.idPost == this.idPost){
        pc.post.contenido = postDto.contenido;
        pc.post.foto = postDto.imagen;
      }
    });
  }

  private isUserProfile(email: string): boolean{
    return email == this.tokenService.getEmail();
  }
}
