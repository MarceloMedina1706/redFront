import { Component, OnInit, Input} from '@angular/core';
import { Comentario } from 'src/app/model/comentario';
import { Post } from 'src/app/model/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  comentarios: Comentario[] = [];
  private _post: Post = new Post(0, "", "", "", this.comentarios);
  public get post(): Post {
    return this._post;
  }
  @Input() public set post(value: Post) {
    this._post = value;
  }

}
