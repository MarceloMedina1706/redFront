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
import { InicioComponent } from './components/inicio/inicio.component';
import { HttpClientModule } from '@angular/common/http';
import { PublicarComponent } from './components/publicar/publicar.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { interceptorProvider } from './interceptor/interceptor.service';
import { UserComponent } from './components/user/user.component';
import { UserFollowComponent } from './components/user/user-follow/user-follow.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from './components/modal/modal.component';
import { ResultadoComponent } from './components/resultado/resultado.component';
import { ItemResultadoComponent } from './components/item-resultado/item-resultado.component';

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
    NavSearchComponent,
    InicioComponent,
    PublicarComponent,
    LoginComponent,
    RegistrationComponent,
    UserComponent,
    UserFollowComponent,
    UserProfileComponent,
    ModalComponent,
    ResultadoComponent,
    ItemResultadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
