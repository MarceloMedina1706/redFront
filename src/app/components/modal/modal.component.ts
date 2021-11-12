import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { CommentDTO } from 'src/app/dto/comment-dto';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @ViewChild("contenido") comentario: ElementRef;
  @Output() sendCommentEvent = new EventEmitter<CommentDTO>();
  idPost: number;
  comment: string;
  
  

  constructor(
    public modal: NgbModal
  ) { }

  ngOnInit(): void {
  }

  openModal(): void{
    this.modal.open(this.comentario);
  }

  sendComment(): void{
    let commentDTO = new CommentDTO(this.idPost, this.comment);
    this.sendCommentEvent.emit(commentDTO);
    this.closeModal();
    this.comment = "";
    this.idPost = -1;
  }

  closeModal(): void {
    this.modal.dismissAll(this.comentario);
  }

}

