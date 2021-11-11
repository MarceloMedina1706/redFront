import { Comentario } from "./comentario";

export class Post {

    idUser: number = 0;
    namesUser: string = "";
    idPost: number = 0;
    fecha: string = "";
    contenido: string = "";
    foto: string = "";

    constructor(idUser:number, namesUser: string,idPost:number, contenido: string, foto: string, fecha: string ){
        this.idUser = idUser;
        this.namesUser = namesUser;
        this.idPost = idPost;
        this.contenido = contenido;
        this.foto = foto;
        this.fecha = fecha;
    }

}
