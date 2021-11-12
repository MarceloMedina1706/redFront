import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../model/post';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PostDto } from '../dto/post-dto';
import { CommentDTO } from '../dto/comment-dto';
import { Comentario } from '../model/comentario';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  constructor(private httpClient: HttpClient) { }

  private _postURL = environment.postUrl;
  
  contenido: string = "";

  getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this._postURL + 'posts');
  }

  savePost(postDto: PostDto): Observable<Post> {
    return this.httpClient.post<Post>(this._postURL + 'savePost', postDto);
  }

  deletePost(idPost: number): Observable<boolean> {
    return this.httpClient.post<boolean>(this._postURL + `deletePost/${idPost}`, null);
  }

  getCommentsPost(idPost: number): Observable<Comentario[]>{
    return this.httpClient.post<Comentario[]>(this._postURL + `getComments/${idPost}`, null);
  }

  commentPost(commentDTO: CommentDTO): Observable<Comentario>{
    return this.httpClient.post<Comentario>(this._postURL + 'saveComment', commentDTO);
  }

  getLikes(): Observable<number[]> {
    return this.httpClient.post<number[]>(this._postURL + 'getLikes', null);
  }

  likePost(idPost: number): Observable<any> {
    return this.httpClient.post<any>(this._postURL + `likePost/${idPost}`, null);
  }

  unLikePost(idPost: number): Observable<any> {
    return this.httpClient.post<any>(this._postURL + `unLikePost/${idPost}`, null);
  }
  
  
}
