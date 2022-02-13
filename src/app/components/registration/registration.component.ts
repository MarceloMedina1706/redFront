import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { RegistrationUser } from 'src/app/model/registration-user';
import { AuthService } from 'src/app/service/auth.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public registrationForm: FormGroup;
  spinner: boolean = false;

  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      lastName: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(100)])],
      matchPassword: [''],
      bornDate: ['', Validators.compose([Validators.required])],
      sex: ['', Validators.compose([Validators.required])]
    },
    { validator: [this.checkMatchingPassword, this.checkDate, this.checkPassword]}
    );
    
   }

  ngOnInit(): void {
  }

  /*createForm() {
    return new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      matchPassword: new FormControl(''),
      bornDate: new FormControl(''),
      sex: new FormControl('', [Validators.required])
    });
  }*/

  onSave(): void {
    if(this.registrationForm.valid){
      let regUser = new RegistrationUser(this.registrationForm.get('name').value,
                                         this.registrationForm.get('lastName').value,
                                         this.registrationForm.get('email').value,
                                         this.registrationForm.get('password').value,
                                         this.registrationForm.get('bornDate').value,
                                         this.registrationForm.get('sex').value);      
      
      /*alert("Usuario registrado correctamente.");
      this.router.navigate(['/verification/save']);*/
      this.spinner = true;
      this.authService.registration(regUser).subscribe(
        data => {
          if(data){
            alert("Usuario registrado correctamente.");
            this.router.navigate(['/verification/save']);
          } 
        }
      );
      
    }else{
      alert("Revise los campos.\n");
    }
  }

  get rf(){
    return this.registrationForm.controls;
  }

  private checkPassword: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = group.get('password').value;
    let val = [true, true, true, true, false, true];//0-MAYUS 1-MINUS 2-NUMERO 3-SIMBOLO 4-ESPACIO 5-LENGTH

    for(let i=0; i<pass.length; i++){
        if(pass.charCodeAt(i) > 64 && pass.charCodeAt(i) < 91) val[0] = false;
        if(pass.charCodeAt(i) > 96 && pass.charCodeAt(i) < 123) val[1] = false;
        if(pass.charCodeAt(i) > 47 && pass.charCodeAt(i) < 58) val[2] = false;
        if(/[^A-Za-z0-9 ]/.test(pass[i])) val[3] = false;
        if(pass.charCodeAt(i) == ' ') val[4] = true;
    }

    if(pass.length > 5) val[5] = false;

    //console.log(val[0] +" "+val[1]+" "+val[2]+" "+val[3]+" "+val[4]+" "+val[5]);

    if(!val[0] && !val[1] && !val[2] && !val[3] && !val[4] && !val[5] ){
        return null
    }


    //console.log(val[0] +" "+val[1]+" "+val[2]+" "+val[3]+" "+val[4]+" "+val[5]);

    let validation = {
      mayus: val[0],
      minus: val[1],
      num: val[2],
      sim: val[3],
      space: val[4],
      length: val[5]
    }


    return validation;
  }

  private checkMatchingPassword: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password').value;
    let matchPass = group.get('matchPassword').value;
    return pass === matchPass ? null : { notSame: true }
  }

  private checkDate: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let dateBorn = new Date(group.get('bornDate').value);
    let rigthNow = new Date();
    return dateBorn < rigthNow ? null : { invalidDate: true }
  }
}
