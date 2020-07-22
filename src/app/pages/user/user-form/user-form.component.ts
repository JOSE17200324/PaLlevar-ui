import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { MatVerticalStepper } from '@angular/material/stepper';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { TileStyler } from '@angular/material/grid-list/tile-styler';
import { UserBean } from 'src/app/_model/UserBean';
import { ProfileBean } from 'src/app/_model/ProfileBean';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
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

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.personalFormGroup = this.formBuilder.group({
      nombreCtrl: ['', Validators.required],
      lastNameCtrl: ['', Validators.required],
      addressCtrl: ['', Validators.required],
      documentTypeIdCtrl: ['', Validators.required],
      documentNumberCtrl: ['', Validators.required],
      cellPhoneCtrl: ['', Validators.required],
      dateBirthCtrl: ['', Validators.required],
      _fotoCtrl: ['']

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
    this.dataEmployee.dateBirth = this.date.value.toDateString();
    this.dataEmployee._foto = this.personalFormGroup.value._fotoCtrl;
    this.dataEmployee._isFoto = this.tieneFoto(this.personalFormGroup.value._fotoCtrl);

    this.dataEmployee.username = this.loginFormGroup.value.usernameCtrl;
    this.dataEmployee.password = this.loginFormGroup.value.passwordCtrl;

    this.dataEmployee.profile = this.dataProfile;
    this.dataEmployee.status = this.estadoSelected;
    this.dataEmployee.employeeCode = this.companyFormGroup.value.employeecodeCtrl;





    console.log(this.dataEmployee);
    console.log(this.date.value.toDateString());
    // console.log(this.selected);
    this.stepper.reset();
    // console.log(this.loginFormGroup);
    // console.log(this.companyFormGroup);
  }
  tieneFoto(foto: any): boolean {
    let isFoto = false;
    if(foto != null){
      isFoto = true;
    }
    return isFoto;
  }

}
