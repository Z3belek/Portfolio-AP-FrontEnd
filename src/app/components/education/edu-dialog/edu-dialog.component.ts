import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { EducationService } from 'src/app/services/education.service';

@Component({
  selector: 'app-edu-dialog',
  templateUrl: './edu-dialog.component.html',
  styleUrls: ['./edu-dialog.component.scss']
})
export class EduDialogComponent implements OnInit {
  eduForm!: FormGroup;
  actionBtn: string = "Add"
  titleTxt: string = "New"
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    private educationService: EducationService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EduDialogComponent>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) { }

  ngOnInit(): void {
    this.eduForm = this.formBuilder.group({
      type: ['', Validators.required],
      title: ['', Validators.required],
      institution: ['', Validators.required],
      imgurl: ['', Validators.required],
      haveurl: [''],
      urlcertificate: [''],
      dtext: ['', Validators.required]
    });
    if (this.editData) {
      this.actionBtn = "Save";
      this.titleTxt = "Modify"
      this.eduForm.controls['type'].setValue(this.editData.type);
      this.eduForm.controls['title'].setValue(this.editData.title);
      this.eduForm.controls['institution'].setValue(this.editData.institution);
      this.eduForm.controls['imgurl'].setValue(this.editData.imgurl);
      this.eduForm.controls['haveurl'].setValue(this.editData.haveurl);
      this.eduForm.controls['urlcertificate'].setValue(this.editData.urlcertificate);
      this.eduForm.controls['dtext'].setValue(this.editData.dtext);
    }
  }

  agregarEducation() {
    if (!this.editData) {
      if (this.eduForm.valid) {
        this.educationService.saveEducation(this.eduForm.value).subscribe({
          next: (res) => {
            let config = new MatSnackBarConfig
            config.panelClass = ['green-snackbar'];
            config.verticalPosition = this.verticalPosition;
            config.horizontalPosition = this.horizontalPosition;
            config.duration = 1500;
            this._snackBar.open("Successfully added", "", config);
            this.eduForm.reset();
            this.dialogRef.close('save');
            window.location.reload();
          },
          error: () => {
            let config = new MatSnackBarConfig
            config.panelClass = ['warn-snackbar'];
            config.verticalPosition = this.verticalPosition;
            config.horizontalPosition = this.horizontalPosition;
            config.duration = 1500;
            this._snackBar.open("Failed to add", "", config);
          }
        })
      }
    } else {
      this.modificar()
    }
  }

  modificar() {
    this.educationService.editEducation(this.editData.id, this.eduForm.value).subscribe({
      next: (res) => {
        let config = new MatSnackBarConfig
        config.panelClass = ['green-snackbar'];
        config.verticalPosition = this.verticalPosition;
        config.horizontalPosition = this.horizontalPosition;
        config.duration = 1500;
        this._snackBar.open("Successfully modified", "", config);
        this.eduForm.reset();
        this.dialogRef.close('update');
        window.location.reload();
      },
      error: () => {
        let config = new MatSnackBarConfig
        config.panelClass = ['warn-snackbar'];
        config.verticalPosition = this.verticalPosition;
        config.horizontalPosition = this.horizontalPosition;
        config.duration = 1500;
        this._snackBar.open("Failed to modify", "", config);
      }
    })
  }
}