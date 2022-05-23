import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {User} from "../model/user";
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AdminService } from '../services/admin.service';
import { Florarie } from '../model/florarie';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent implements OnInit {

  userForm! : FormGroup;
  userToEdit! : User;
  currentUser! : User;
  editFlorarie!: Florarie;
  actionBtn : string = "Save";
  constructor(public dialog: MatDialog, private formBuilder : FormBuilder, private httpClient :HttpClient,
     private adminService: AdminService,
      public dialogRef : MatDialogRef<AddUserDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public editData : any ) { }


  ngOnInit(): void {
    console.log(this.editData);
    this.userForm = this.formBuilder.group({
      username: new FormControl('',{validators: [Validators.required]}),
      password: new FormControl('',{validators: [Validators.required]}),
      florarie: new FormControl('',{validators: [Validators.required]}),
      role:new FormControl('',{validators: [Validators.required]})
    });
    if(this.editData) {
      this.actionBtn="Update";
      this.userForm.controls['username'].setValue(this.editData.username);
      this.userForm.controls['password'].setValue(this.editData.password);
      this.userForm.controls['role'].setValue(this.editData.role);
      this.userForm.controls['florarie'].setValue(this.editData.florarie);
    }
  }

  add() {
    console.log(this.userForm.value);
    if(!this.editData){
      if(this.userForm.valid) {
        this.currentUser = new User();
        this.currentUser.florarie = new Florarie();
        this.currentUser.username = this.userForm.get('username')?.value;
        this.currentUser.password = this.userForm.get('password')?.value;
        this.currentUser.role = this.userForm.get('role')?.value;
      
        this.currentUser.florarie.denumire = this.userForm.get('florarie')?.value;
        this.currentUser.florarie.flori = [];
        console.log(this.currentUser.florarie.denumire);
        this.adminService.addUser(this.currentUser).subscribe({
          next:(res) =>{
            alert("User added successfully!");
            this.userForm.reset();
            this.dialogRef.close('save');
          },
          error:() => {
            alert("Error while adding the user!");
          }
        });
      }
  } else {
    this.updateUser();
  }
}
updateUser() {
  this.userToEdit = new User();
 /// this.userToEdit.florarie.denumire = this.userForm.value.florarie.denumire;
  this.userToEdit.username = this.userForm.value.username;
  this.userToEdit.password =this.userForm.value.password;
  this.userToEdit.role = this.userForm.value.role;
  this.editFlorarie = new Florarie();
  this.editFlorarie.denumire = this.userForm.value.florarie;
  this.editFlorarie.employee = this.userForm.value.username;
  this.editFlorarie.flori  =[];
  this.userToEdit.florarie = this.editFlorarie;
  

  this.adminService.putUser(this.userToEdit, this.editData.username).subscribe({
    next:(res) =>{
      alert("User updated successfully!");
      this.userForm.reset();
      this.dialogRef.close('update');
    },
    error:() => {
      alert("Error while updating the user!");
    }
  });
}
}
