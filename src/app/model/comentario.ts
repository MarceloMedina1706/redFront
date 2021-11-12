export class Comentario {

    usernames: string;
    fecha: string;
    contenido: string;
    idUser: number;
    idPost: number;

    constructor(
        usernames: string,
        fecha: string,
        contenido: string,
        idUser: number,
        idPost: number
    ){
        this.usernames = usernames;
        this.fecha = fecha;
        this.contenido = contenido;
        this.idUser = idUser;
        this.idPost = idPost;
    }
}
