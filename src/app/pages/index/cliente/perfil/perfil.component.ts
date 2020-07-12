import { Router } from '@angular/router';
import { SharedService } from './../../../../_service/shared.service';
import { Component, OnInit} from '@angular/core';
import { UserBean } from '../../../../_model/UserBean';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  user:UserBean;

  mostrar:boolean=false;

  constructor(

    private sharedService: SharedService,

  ) {}

  ngOnInit(): void {
    this.obtenerPerfil();
  }


  obtenerPerfil(){
    this.user=this.sharedService.userSession;
    //  _isFoto: boolean;
   if(this.user._foto==null){
      this.mostrar=true;
    }
    console.log('katriel18 : ',this.user);    
  }

}
