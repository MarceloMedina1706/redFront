import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-header',
  templateUrl: './post-header.component.html',
  styleUrls: ['./post-header.component.css']
})
export class PostHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  editarPost(): void{
    alert("EDITAR POST: " + this._idPost);
  }

  eliminarPost(): void{
    alert("ELIMINAR POST: " + this._idPost);
  }

  
  private _usuario: string = "";
  public get usuario(): string {
    return this._usuario;
  }
  @Input() public set usuario(value: string) {
    this._usuario = value;
  }

  
  private _fecha: string = "";
  public get fecha(): string {
    return this._fecha;
  }
  @Input() public set fecha(value: string) {
    this._fecha = value;
  }

  private _idPost: number = 0;
  public get idPost(): number {
    return this._idPost;
  }
  @Input() public set idPost(value: number) {
    this._idPost = value;
  }

}
