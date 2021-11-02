import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-body',
  templateUrl: './post-body.component.html',
  styleUrls: ['./post-body.component.css']
})
export class PostBodyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  private _contenidoPost = "";
  public get contenidoPost() {
    return this._contenidoPost;
  }
  @Input() public set contenidoPost(value) {
    this._contenidoPost = value;
  }
}
