export class PostDto {

    contenido: string = "";
    imagen: string = "";

    constructor(contenido: string, imagen: string){
        this.contenido = contenido;
        this.imagen = imagen;
    }
}
