import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
  selector: 'app-exp-dialog',
  templateUrl: './exp-dialog.component.html',
  styleUrls: ['./exp-dialog.component.scss']
})
export class ExpDialogComponent implements OnInit {
  expForm !: FormGroup;
  actionBtn: string = "Add"
  titleTxt: string = "New"
  technologiesList: string[] = ['Angular', 'Bootstrap', 'CSS', 'Figma', 'HTML', 'Java', 'Javascript', 'Nodejs', 'PHP', 'React', 'Redux', 'Sass', 'Spring', 'Vue'];
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(
    private experienceService: ExperienceService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ExpDialogComponent>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) { }

  ngOnInit(): void {
    this.expForm = this.formBuilder.group({
      year1: ['', Validators.required],
      year2: ['', Validators.required],
      role: ['', Validators.required],
      place: ['', Validators.required],
      technologies: ['', Validators.required],
      responsibilities: this.formBuilder.array([], Validators.required)
    });
    if (this.editData) {
      this.actionBtn = "Save";
      this.titleTxt = "Modify"
      this.expForm.controls['role'].setValue(this.editData.role);
      this.expForm.controls['place'].setValue(this.editData.place);
      this.expForm.controls['year1'].setValue(this.editData.year1);
      this.expForm.controls['year2'].setValue(this.editData.year2);
      this.expForm.controls['technologies'].setValue(this.editData.technologies);
      this.expForm.controls['responsibilities'].setValue(this.editData.responsibilities);
    }
  }
  
  get technologies(): FormControl {
    return this.expForm.get('technologies') as FormControl;
  }
  get responsibilities(): FormArray {
    return this.expForm.get('responsibilities') as FormArray;
  }

  agregarExperience(){
    if(!this.editData) {
      if(this.expForm.valid){
        this.experienceService.saveExperience(this.expForm.value).subscribe({
          next:(res)=>{
            let config = new MatSnackBarConfig
            config.panelClass = ['green-snackbar'];
            config.verticalPosition = this.verticalPosition;
            config.horizontalPosition = this.horizontalPosition;
            config.duration = 1500;
            this._snackBar.open("Successfully added", "" , config);
            this.expForm.reset();
            this.dialogRef.close('save');
            window.location.reload();
          },
          error:()=>{
            let config = new MatSnackBarConfig
            config.panelClass = ['warn-snackbar'];
            config.verticalPosition = this.verticalPosition;
            config.horizontalPosition = this.horizontalPosition;
            config.duration = 1500;
            this._snackBar.open("Failed to add", "" , config);
          }
        })
      }
    } else {
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || "").trim()) {
      this.responsibilities.push(this.formBuilder.control(value));
    }
    if (input) {
      input.value = "";
    }
  }

  remove(responsibilities: string): void {
    const index = this.responsibilities.value.indexOf(responsibilities);
    if (index >= 0) {
      this.responsibilities.removeAt(index);
    }
  }
}