export class CommentDTO {

    idPost: number;
	comment: string;

    constructor(idPost: number, comment: string){
        this.idPost = idPost;
        this.comment = comment;
    }
}
