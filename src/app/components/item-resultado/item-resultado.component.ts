import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-resultado',
  templateUrl: './item-resultado.component.html',
  styleUrls: ['./item-resultado.component.css']
})
export class ItemResultadoComponent implements OnInit {

  constructor() { }

  @Input() name: string;
  @Input() lastName: string;
  @Input() idUser: number;

  ngOnInit(): void {
  }

}
