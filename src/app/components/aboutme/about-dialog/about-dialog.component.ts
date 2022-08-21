import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AboutmeService } from 'src/app/services/aboutme.service';

@Component({
  selector: 'app-about-dialog',
  templateUrl: './about-dialog.component.html',
  styleUrls: ['./about-dialog.component.scss']
})
export class AboutDialogComponent implements OnInit {
  aboutForm!: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private aboutmeService: AboutmeService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<AboutDialogComponent>,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.aboutForm = this.formBuilder.group({
      dtext: ['', Validators.required],
      percentage1: ['', Validators.required],
      percentage2: ['', Validators.required],
      percentage3: ['', Validators.required],
      tpercentage1: ['', Validators.required],
      tpercentage2: ['', Validators.required],
      tpercentage3: ['', Validators.required]
    });
    this.aboutForm.controls['dtext'].setValue(this.editData.dtext);
    this.aboutForm.controls['percentage1'].setValue(this.editData.percentage1);
    this.aboutForm.controls['percentage2'].setValue(this.editData.percentage2);
    this.aboutForm.controls['percentage3'].setValue(this.editData.percentage3);
    this.aboutForm.controls['tpercentage1'].setValue(this.editData.tpercentage1);
    this.aboutForm.controls['tpercentage2'].setValue(this.editData.tpercentage2);
    this.aboutForm.controls['tpercentage3'].setValue(this.editData.tpercentage3);
  }

  modificar() {
    this.aboutmeService.editAboutme(this.aboutForm.value).subscribe({
      next: (res) => {
        let config = new MatSnackBarConfig
        config.panelClass = ['green-snackbar'];
        config.verticalPosition = this.verticalPosition;
        config.horizontalPosition = this.horizontalPosition;
        config.duration = 1500;
        this._snackBar.open("Successfully modified", "", config);
        this.aboutForm.reset();
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