import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';
import { Comentario } from 'src/app/model/comentario';
import { PostServiceService } from 'src/app/service/post-service.service';

@Component({
  selector: 'app-post-comentarios',
  templateUrl: './post-comentarios.component.html',
  styleUrls: ['./post-comentarios.component.css']
})
export class PostComentariosComponent implements OnInit {

  constructor(
    private postService: PostServiceService
  ) { }

  ngOnInit(): void {
    this.postService.getCommentsPost(this.idPost).subscribe(
      data => {
        this._comentarios = data;
        if(this._comentarios.length == 0){
          let comment = new Comentario("", "", "", -1, -1);
          this._comentarios.push(comment);
        }
      }
    );

  }

  desplegarComentarios(): void{
    var selector = ".overflow-auto[idPost = "+this.idPost+"]";
    if($(selector).find(".collapse").is(":visible") == false){
        //if($(selector).find(".collapse").children().length == 0){
        /*if(this._comentarios.length == 0){
            $(selector).find(".collapse").html('<div class="card card-body"><div class="bg-warning p-4" style="border-radius: 1em;"><p>No hay comentarios</p></div></div>');
        }else{
          let html ='<app-comentario [comentario] = "'+this._comentarios[0]+'"></app-comentario>';
          $(selector).find(".collapse").html(html);
        }*/
        $(selector).find(".collapse").fadeToggle("show");
        $(selector).css("height", "16em");
    }else{

        $(selector).find(".collapse").fadeToggle("hide");
        $(selector).css("height", ".1em");
        
    }
  }

  addComment(comment: Comentario): void{
    if(this._comentarios.length == 1 && this._comentarios[0].idPost == -1){
      this._comentarios[0] = comment;
    }else{
      this._comentarios.unshift(comment);
    }
    
    //alert("Length: "+this._comentarios.length);
  }

  @Input()
  private _comentarios: Comentario[] = [];
  public get comentarios(): Comentario[] {
    return this._comentarios;
  }
  @Input() public set comentarios(value: Comentario[]) {
    this._comentarios = value;
  }
 
  
  private _idPost: number = 0;
  public get idPost(): number {
    return this._idPost;
  }
  @Input() public set idPost(value: number) {
    this._idPost = value;
  }
}
