import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private router: Router
  ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  boolean  {
    if(this.tokenService.isLogged()){
      this.router.navigate(['/inicio']);
      return false;
    }
    return true;
  }
  
}
