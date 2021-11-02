import { Comentario } from "./comentario";

export class Post {

    id: number = 0;
    usuario: string = "";
    fecha: string = "";
    contenido: string = "";
    comentarios : Comentario[] = [];

    constructor(id:number, usuario: string, fecha: string, contenido: string, comentarios: Comentario[]){
        this.id = id;
        this.usuario = usuario;
        this.fecha = fecha;
        this.contenido = contenido;
        this.comentarios = comentarios;
    }

}
