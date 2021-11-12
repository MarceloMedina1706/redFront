import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PostDto } from 'src/app/dto/post-dto';
import { Post } from 'src/app/model/post';
import { PostServiceService } from 'src/app/service/post-service.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.component.html',
  styleUrls: ['./publicar.component.css']
})
export class PublicarComponent implements OnInit {

  constructor(
    private postService: PostServiceService,
    private tokenService: TokenService,
    private router: Router
    
    ) { }

  ngOnInit(): void {
  }

  contenido: string = "";
  imagen: string = "";
  @Output() postEvent = new EventEmitter<Post>();

  publicar(): void {
    
    if(this.tokenService.isLogged()){
      if(this.contenido != ""){
        const buttonPub = document.querySelector(".btn-danger");
        $(buttonPub).prop("disabled", true);
        const postDto = new PostDto(this.contenido, this.imagen);
        this.postService.savePost(postDto).subscribe(
          data => {
            this.sendPost(data);
          }
        );
      }
    }else{
      this.router.navigate(['/login']);
    }


  }

  sendPost(post:Post) {
    this.postEvent.emit(post);
    this.contenido = "";
    const buttonPub = document.querySelector(".btn-danger");
    $(buttonPub).prop("disabled", false);
  }
}
