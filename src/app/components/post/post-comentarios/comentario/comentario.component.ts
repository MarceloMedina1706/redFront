import { Component, OnInit, Input } from '@angular/core';
import { Comentario } from 'src/app/model/comentario';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.css']
})
export class ComentarioComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  date: string;
  noComment: boolean = false;

  private _comentario: Comentario;
  public get comentario(): Comentario {
    return this._comentario;
  }
  @Input() public set comentario(value: Comentario) {
    this._comentario = value;
    if(value.idPost == -1){
      this.date = this._comentario.fecha;
      this.noComment = true;
    }else{
      let datetime = this._comentario.fecha;
      let dia = datetime.split("T")[0];
      let hora = datetime.split("T")[1].split(":")[0] +":"+ datetime.split("T")[1].split(":")[1];
      this.date = dia + " " + hora;
    }

  }
}
