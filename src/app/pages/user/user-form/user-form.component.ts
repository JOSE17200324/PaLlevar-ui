import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { MatVerticalStepper } from '@angular/material/stepper';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { TileStyler } from '@angular/material/grid-list/tile-styler';
import { UserBean } from 'src/app/_model/UserBean';
import { ProfileBean } from 'src/app/_model/ProfileBean';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmacionComponent } from '../dialog-confirmacion/dialog-confirmacion.component';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';
import { DialogFotoComponent } from './dialog-foto/dialog-foto.component';
import { UserService } from 'src/app/_service/user.service';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class UserFormComponent implements OnInit {

  personalFormGroup: FormGroup;
  loginFormGroup: FormGroup;
  companyFormGroup: FormGroup;
  // date = new FormControl(new Date());
  date = new FormControl((new Date()).toISOString());
  @ViewChild('stepper') stepper: MatVerticalStepper;

  /* formPersonalCtrl: string[] = ['nombre', 'address', 'documentTypeId', 'documentNumber'];
  formLoginCtrl: string[] = ['username', 'password'];
  formCompanyCtrl: string[] = ['nombre', 'description', 'status', 'employeecode']; */

  dataEmployee: UserBean;
  dataProfile: ProfileBean = new ProfileBean();
  documentTypeselected: string;
  estadoSelected: string;

  mensaje = 'Registro exitoso';

/*   employee: UserBean;
  employeeProfile: ProfileBean;
  profileMenuOptionBean: ProfileMenuOptionBean; */



  hide = true;
  // profile: Profile[] = [{idProfile: 1, name: 'empleado 1', description: 'el empleado'}];
 /*  user: User[] = [{
                    id: 1, nombre: 'Jose', password: '123', status: 'disponible',
                    address: 'av. sol', username: 'jose',
                    employeeCode: '123', documentTypeId: '123',
                    documentNumber: '123', profile: this.profile[0]
                  }]; */

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog,
              private serviceUser: UserService) {}

  ngOnInit(): void {
    this.personalFormGroup = this.formBuilder.group({
      nombreCtrl: ['', Validators.required],
      lastNameCtrl: ['', Validators.required],
      addressCtrl: ['', Validators.required],
      documentTypeIdCtrl: ['', Validators.required],
      documentNumberCtrl: ['', Validators.required],
      cellPhoneCtrl: ['', Validators.required],
      dateBirthCtrl: ['', Validators.required]

    });
    this.loginFormGroup = this.formBuilder.group({
      passwordCtrl: ['', Validators.required],
      usernameCtrl: ['', Validators.required],
    });
    this.companyFormGroup = this.formBuilder.group({
      statusCtrl: ['', Validators.required],
      employeecodeCtrl: ['', Validators.required],
    });
  }

  registrar(): void {

    this.dataEmployee = new UserBean();
    // this.selected = this.personalFormGroup.value.nombreCtrl;
    this.dataEmployee.nombre = this.personalFormGroup.value.nombreCtrl;
    this.dataEmployee.lastName = this.personalFormGroup.value.lastNameCtrl;
    this.dataEmployee.address = this.personalFormGroup.value.addressCtrl;
    this.dataEmployee.documentTypeId = this.documentTypeselected;
    this.dataEmployee.documentNumber = this.personalFormGroup.value.documentNumberCtrl;
    this.dataEmployee.cellPhone = this.personalFormGroup.value.cellPhoneCtrl;
    this.dataEmployee.dateBirth = this.date.value;
    this.dataEmployee._foto = this.serviceUser.imagen;
    this.dataEmployee._isFoto = this.tieneFoto(this.serviceUser.imagen);

    this.dataEmployee.username = this.loginFormGroup.value.usernameCtrl;
    this.dataEmployee.password = this.loginFormGroup.value.passwordCtrl;

    this.dataEmployee.profile = this.dataProfile;
    this.dataEmployee.status = this.estadoSelected;
    this.dataEmployee.employeeCode = this.companyFormGroup.value.employeecodeCtrl;


    console.log(this.dataEmployee);
    console.log(this.date.value);

    // console.log(this.selected);
    if (this.dataEmployee.nombre == '' || this.dataEmployee.lastName == '' ||
      this.dataEmployee.address == '' || this.dataEmployee.password == '' ||
      this.dataEmployee.documentNumber == '' || this.dataEmployee.username == '' ||
      this.dataEmployee.employeeCode == '') {
      alert('Debe completar todos los campos');
    } else {
      this.openConfirmation();
      this.stepper.reset();
    }
  }
  tieneFoto(foto: any): boolean {
    let isFoto = false;
    if(foto != null){
      isFoto = true;
    }
    return isFoto;
  }

  openConfirmation() {
    const dialogRef = this.dialog.open(DialogConfirmacionComponent, {
      width: '250px', data: this.mensaje
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  subirFoto() {
    const dialogRef = this.dialog.open(DialogFotoComponent, {
      width: '250px', data: this.mensaje
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

