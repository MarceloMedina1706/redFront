import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';
import { Comentario } from 'src/app/model/comentario';

@Component({
  selector: 'app-post-comentarios',
  templateUrl: './post-comentarios.component.html',
  styleUrls: ['./post-comentarios.component.css']
})
export class PostComentariosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  desplegarComentarios(): void{
    var selector = ".overflow-auto[idPost = "+this.idPost+"]";
    if($(selector).find(".collapse").is(":visible") == false){
        if($(selector).find(".collapse").children().length == 0){
            $(selector).find(".collapse").html('<div class="card card-body"><div class="bg-warning p-4" style="border-radius: 1em;"><p>No hay comentarios</p></div></div>');
        }
        $(selector).find(".collapse").fadeToggle("show");
        $(selector).css("height", "16em");
    }else{

        $(selector).find(".collapse").fadeToggle("hide");
        $(selector).css("height", ".1em");
        
    }
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
