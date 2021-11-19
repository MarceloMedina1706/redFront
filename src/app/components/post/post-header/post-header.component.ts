import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-post-header',
  templateUrl: './post-header.component.html',
  styleUrls: ['./post-header.component.css']
})
export class PostHeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
  }

  action: boolean = false;

  @Output() updEvent = new EventEmitter<void>();
  editarPost(): void{
    this.updEvent.emit();
  }

  @Output() delEvent = new EventEmitter<void>();
  eliminarPost(): void{
    this.delEvent.emit();
  }

  redUser(): void{
    if(this.tokenService.getIdUser() != this.idUser)
      this.router.navigate(['/user/' + this.idUser]);
    else
      this.router.navigate(['/user']);
  }

  private _usuario: string = "";
  public get usuario(): string {
    return this._usuario;
  }
  @Input() public set usuario(value: string) {
    this._usuario = value;
  }

  
  private _fecha: string = "";
  public get fecha(): string {
    return this._fecha;
  }
  @Input() public set fecha(value: string) {
    
    let dia = value.split("T")[0];
    let hora = value.split("T")[1].split(":")[0] +":"+ value.split("T")[1].split(":")[1];
    
    this._fecha = dia + " " + hora;
  }

  private _idPost: number = 0;
  public get idPost(): number {
    return this._idPost;
  }
  @Input() public set idPost(value: number) {
    this._idPost = value;
  }

  private _iduser: number;
  public get idUser(): number {
    return this._iduser;
  }
  @Input() public set idUser(value: number) {
    this._iduser = value;
    if(this.tokenService.getIdUser() == this._iduser) this.action = true;
  }

}
