export class Comentario {

    usuario: string = "";
    fecha: string = "";
    comentario: string = "";

    constructor(usuario: string, fecha: string, comentario: string){
        this.usuario = usuario;
        this.fecha = fecha;
        this.comentario = comentario;
    }
}
