import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-aviso',
  templateUrl: './aviso.component.html',
  styleUrls: ['./aviso.component.css']
})
export class AvisoComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService
  ) { 
    this.confirmCodeForm = this.fb.group({
      confirmCode: ['', Validators.compose([Validators.required])]
    },
    { validator: [this.checkNumbers, this.checkCodeLength]}
    );

  }

  status: number;
  errorStatus: number;
  message:String;
  public confirmCodeForm: FormGroup;
  spinner: boolean = false;

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.showMessage(params.get('msg'));

    });
  }

  // ==============================================================================================================
  onSubmit(): void {
    if(this.confirmCodeForm.valid){
      this.spinner = true;
      this.authService.sendConfirmCode(this.confirmCodeForm.get('confirmCode').value).subscribe(
        data => {
          
          if(data){
            this.router.navigate(['/login']);
          }
        },
        err => {
          this.errorStatus = err.status;
          if(this.errorStatus == 404 || this.errorStatus == 208) this.router.navigate(['/verification/err']);
          else if(this.errorStatus == 426) this.router.navigate(['/verification/exp']);
        }
      );
    }
  }

  resend(): void {

    let code = this.confirmCodeForm.get('confirmCode').value;
    if(code == "") this.router.navigate(['/verification/err']);

    this.authService.resendConfirmCode(code).subscribe(
      data => {
        if(data){
          this.confirmCodeForm.setValue({
            confirmCode: ''
          });
          this.router.navigate(['/verification/save']);
        }
      }
    );
  }


  // ==============================================================================================================




  get ccf(){
    return this.confirmCodeForm.controls;
  }

  private showMessage(msg: string): void{
    if(msg == 'save'){
      this.message = "Te enviamos un correo de verificación.";
      this.status = 0;
    }else if(msg == 'exp'){
      this.message = "El código expiró.";
      this.status = 1;
    }else if(msg == 'err'){
      this.message = "Ha ocurridó un error.";
      this.status = 2;
    }
  }

  // Validators =================================================================================================
  private checkCodeLength: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let codeConfirm = group.get("confirmCode").value;
    return codeConfirm.length > 6 ? null : { invalidLength: true };
  }

  private checkNumbers: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let codeConfirm = group.get("confirmCode").value;
    for(let i=0; i<codeConfirm.length; i++){
      if(codeConfirm.charCodeAt(i) > 58 || codeConfirm.charCodeAt(i) < 47){
        return {invalidCode: true}
      }
    }
    return null;
  }

}
