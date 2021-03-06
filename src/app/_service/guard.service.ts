import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { MenuOptionService } from './menu-option.service';
import { SharedService } from './shared.service';
import { MenuOptionBean } from '../_model/MenuOptionBean';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private loginService: LoginService, private router: Router,
    public menuService: MenuOptionService,
    private sharedService: SharedService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //SI ESTAS LOGEADO
    
    let rpta = this.loginService.estaLogueado();
    console.log(rpta);

    if (!rpta) {
      sessionStorage.clear();
      this.router.navigate(['auth/login']);
      return false;
    } else {
      //SI TOKEN ESTA VIGENTE
      let token = sessionStorage.getItem(environment.TOKEN_NAME);

      const helper = new JwtHelperService();
    console.log(!helper.isTokenExpired(token));
      if (!helper.isTokenExpired(token)) {
        //SI TIENES EL ROL NECESARIO  
        const decodedToken = helper.decodeToken(token);
      
        let url = state.url; // /pelicula
        console.log(url);
        console.log(this.sharedService.userSession.id);
        return this.menuService.listarPorProfileId(this.sharedService.userSession.profile.idProfile).pipe(map((data: MenuOptionBean[]) => {
          this.menuService.menuCambio=data; 
          //this.menuService.menuCambio.next(data);
        
          console.log(data);
          let cont = 0;
          for (let menuBD of data) {
            if (url.startsWith(menuBD.urlMenu)) {
              cont++;
              break;
            }
          }

          if (cont > 0) {
            return true;
          } else {
            this.router.navigate(['auth/login']);
            return false;
          }
        }, error =>{
          console.error(error);
        }));
      } else {
        sessionStorage.clear();
        this.router.navigate(['auth/login']);
        return false;
      }
    }

  }
}

