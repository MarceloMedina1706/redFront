import { Component, OnInit } from '@angular/core';
import { Comentario } from './model/comentario';
import { Post } from './model/post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'redBACK';

  ngOnInit(): void {
    this.comentarios.push(this.comentario);
    this.comentarios.push(this.comentario2);
    this.comentarios.push(this.comentario3);

    this.posts.push(new Post(1, "Usuario A", "14/07/2015" , "Contenido del post del usuario A", this.comentarios));
    this.posts.push(new Post(2, "Usuario B", "15/07/2015" , "Contenido del post del usuario B", this.comentarios));
    this.posts.push(new Post(3, "Usuario C", "16/07/2015" , "Contenido del post del usuario C", this.comentarios2));

  }

  comentario: Comentario = new Comentario("Usuario 1", "14/07/2015" , "Comentario del usuario 1");
  comentario2: Comentario = new Comentario("Usuario 2", "15/07/2015" , "Comentario del usuario 2");
  comentario3: Comentario = new Comentario("Usuario 3", "16/07/2015" , "Comentario del usuario 3");
  comentarios: Comentario[] = [];
  comentarios2: Comentario[] = [];

  posts: Post[] = [];
}
