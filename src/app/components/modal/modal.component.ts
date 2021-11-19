import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { CommentDTO } from 'src/app/dto/comment-dto';
import { PostDto } from 'src/app/dto/post-dto';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @ViewChild("contenido") comentario: ElementRef;
  @ViewChild("updatePost") updatePost: ElementRef;
  @Output() sendCommentEvent = new EventEmitter<CommentDTO>();
  @Output() sendUpdatePostEvent = new EventEmitter<PostDto>();
  idPost: number;
  comment: string;
  contenidoPost: string;
  
  

  constructor(
    public modal: NgbModal
  ) { }

  ngOnInit(): void {
  }

  openModal(modal: string): void{
    switch(modal){
      case 'comment': this.modal.open(this.comentario);
               break;
      case 'updatePost': this.modal.open(this.updatePost);
               break;
      
    }
    
  }

  sendComment(): void{
    let commentDTO = new CommentDTO(this.idPost, this.comment);
    this.sendCommentEvent.emit(commentDTO);
    this.closeModal("comment");
    this.comment = "";
    this.idPost = -1;
  }

  sendUpdatePost(): void{
    let postDTO = new PostDto(this.contenidoPost, "");
    this.sendUpdatePostEvent.emit(postDTO);
    this.closeModal("updatePost");
    this.contenidoPost = "";
    this.idPost = -1;
  }

  closeModal(modal: string): void {
    switch(modal){
      case 'comment': this.modal.dismissAll(this.comentario);
               break;
      case 'updatePost': this.modal.dismissAll(this.updatePost);
               break;
      
    }
  }

}

