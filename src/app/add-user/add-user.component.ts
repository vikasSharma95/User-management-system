import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
export interface userDataForm {
  name:string;
  role: string;
  email: string;
  id: number;
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  public addShopFormGroup!: FormGroup;
userData : userDataForm = {
  name: '',
  role: '',
  email: '',
  id: 0
}
  constructor( private fb:FormBuilder, private ref:MatDialogRef<AddUserComponent>, @Inject(MAT_DIALOG_DATA) public data:any) {

   }

  ngOnInit() {
    this.addShopFormGroup = this.fb.group({
      name : ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      role : ['', [Validators.required, Validators.maxLength(200)]],
      email : ['',[Validators.required, Validators.email]]
    });
    this.userData = this.data
    console.log(this.userData);
    this.addShopFormGroup.patchValue({
      name:this.userData?.name,
      email:this.userData.email,
      role:this.userData.role,
    })
    
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.addShopFormGroup.controls[controlName].hasError(errorName);
  }
  onSubmit(){
    if(this.addShopFormGroup.valid){
      this.userData.name = this.addShopFormGroup.value.name;
      this.userData.email = this.addShopFormGroup.value.email;
      this.userData.role = this.addShopFormGroup.value.role;
      this.ref.close(this.userData)
    }
  }
  
  closePopup(){
    this.ref.close({data:"close Model"})
  }

}
