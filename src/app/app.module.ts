import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponent } from './components/post/post.component';
import { PostHeaderComponent } from './components/post/post-header/post-header.component';
import { PostBodyComponent } from './components/post/post-body/post-body.component';
import { PostFooterComponent } from './components/post/post-footer/post-footer.component';
import { PostComentariosComponent } from './components/post/post-comentarios/post-comentarios.component';
import { ComentarioComponent } from './components/post/post-comentarios/comentario/comentario.component';
import { NavComponent } from './components/nav/nav.component';
import { NavSearchComponent } from './components/nav/nav-search/nav-search.component';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PostHeaderComponent,
    PostBodyComponent,
    PostFooterComponent,
    PostComentariosComponent,
    ComentarioComponent,
    NavComponent,
    NavSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
