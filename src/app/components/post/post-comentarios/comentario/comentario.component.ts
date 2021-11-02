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

  private _comentario: Comentario = new Comentario("", "", "");
  public get comentario(): Comentario {
    return this._comentario;
  }
  @Input() public set comentario(value: Comentario) {
    this._comentario = value;
  }
}
