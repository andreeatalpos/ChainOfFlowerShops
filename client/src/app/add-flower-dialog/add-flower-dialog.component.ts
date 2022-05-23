import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FloareFlorarie } from '../model/floare-florarie';
import { Florarie } from '../model/florarie';
import { AdminService } from '../services/admin.service';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-add-flower-dialog',
  templateUrl: './add-flower-dialog.component.html',
  styleUrls: ['./add-flower-dialog.component.css']
})
export class AddFlowerDialogComponent implements OnInit {
  
  
  flowerForm! : FormGroup;
  currentFlower! :FloareFlorarie;
  flowerToedit! :FloareFlorarie;
  editFlorarie!: Florarie;
  actionBtn : string = "Save";
  constructor(public dialog: MatDialog, private formBuilder : FormBuilder, private httpClient :HttpClient,
     private employeeService: EmployeeService,
      public dialogRef : MatDialogRef<AddFlowerDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public editData : any ) { }


  ngOnInit(): void {
    console.log(this.editData);
    this.flowerForm = this.formBuilder.group({
      denumire: new FormControl('',{validators: [Validators.required]}),
      culoare: new FormControl('',{validators: [Validators.required]}),
      pret: new FormControl('',{validators: [Validators.required]}),
      cantitate:new FormControl('',{validators: [Validators.required]}),
      disponibilitate:new FormControl('',{validators: [Validators.required]})
    });
    if(this.editData) {
      this.actionBtn="Update";
      this.flowerForm.controls['denumire'].setValue(this.editData.denumire);
      this.flowerForm.controls['culoare'].setValue(this.editData.culoare);
      this.flowerForm.controls['pret'].setValue(this.editData.pret);
      this.flowerForm.controls['cantitate'].setValue(this.editData.cantitate);
      this.flowerForm.controls['disponibilitate'].setValue(this.editData.disponibilitate);
      
    }
  }

  add() {
    console.log(this.flowerForm.value);
    if(!this.editData){
      if(this.flowerForm.valid) {
        this.currentFlower = new FloareFlorarie();
        this.currentFlower.denumire = this.flowerForm.get('denumire')?.value;
        this.currentFlower.culoare = this.flowerForm.get('culoare')?.value;
        this.currentFlower.pret = this.flowerForm.get('pret')?.value;
        this.currentFlower.cantitate = this.flowerForm.get('cantitate')?.value;
        this.currentFlower.disponibilitate = this.flowerForm.get('disponibilitate')?.value;

        this.employeeService.addFlower(this.currentFlower, 'Buchetino').subscribe({
          next:(res) =>{
            alert("Flower added successfully!");
            this.flowerForm.reset();
            this.dialogRef.close('save');
          },
          error:() => {
            alert("Error while adding the new flower!");
          }
        });
      }
  } else {
    console.log("update");
    this.updateFlower();
  }
}
updateFlower() {

  this.flowerToedit = new FloareFlorarie();
  this.flowerToedit.denumire = this.flowerForm.value.denumire;
  this.flowerToedit.culoare = this.flowerForm.value.culoare;
  this.flowerToedit.pret = this.flowerForm.value.pret;
  this.flowerToedit.cantitate = this.flowerForm.value.cantitate;
  this.flowerToedit.disponibilitate = this.flowerForm.value.disponibilitate;


  this.employeeService.updateFlower(this.flowerToedit, 'Buchetino',this.editData.culoare, this.editData.denumire).subscribe({
    next:(res) =>{
      alert("Flower updated successfully!");
      this.flowerForm.reset();
      this.dialogRef.close('update');
    },
    error:() => {
      alert("Error while updating the flower!");
    }
  });

}
}
