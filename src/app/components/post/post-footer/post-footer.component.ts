import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-footer',
  templateUrl: './post-footer.component.html',
  styleUrls: ['./post-footer.component.css']
})
export class PostFooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

 private _idPost: number = 0;

  public get idPost(): number {
    return this._idPost;
  }
   @Input() public set idPost(value: number) {
    this._idPost = value;
  }

  like(): void {

    alert(this.idPost);
  }
}
