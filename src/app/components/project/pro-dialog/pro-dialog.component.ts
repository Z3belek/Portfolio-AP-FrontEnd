import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-pro-dialog',
  templateUrl: './pro-dialog.component.html',
  styleUrls: ['./pro-dialog.component.scss']
})
export class ProDialogComponent implements OnInit {
  proForm !: FormGroup;
  actionBtn: string = "Add"
  titleTxt: string = "New"
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    private projectService: ProjectService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ProDialogComponent>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) { }

  ngOnInit(): void {
    this.proForm = this.formBuilder.group({
      title: ['', Validators.required],
      github: ['', Validators.required],
      haveurl: [''],
      finalurl: [''],
      dtext: ['', Validators.required]
    });
    if (this.editData) {
      this.actionBtn = "Save";
      this.titleTxt = "Modify"
      this.proForm.controls['title'].setValue(this.editData.title);
      this.proForm.controls['github'].setValue(this.editData.github);
      this.proForm.controls['haveurl'].setValue(this.editData.haveurl);
      this.proForm.controls['finalurl'].setValue(this.editData.finalurl);
      this.proForm.controls['dtext'].setValue(this.editData.dtext);
    }
  }

  agregarProject() {
    if (!this.editData) {
      if (this.proForm.valid) {
        this.projectService.saveProject(this.proForm.value).subscribe({
          next: (res) => {
            let config = new MatSnackBarConfig
            config.panelClass = ['green-snackbar'];
            config.verticalPosition = this.verticalPosition;
            config.horizontalPosition = this.horizontalPosition;
            config.duration = 1500;
            this._snackBar.open("Successfully added", "", config);
            this.proForm.reset();
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
    this.projectService.editProject(this.editData.id, this.proForm.value).subscribe({
      next: (res) => {
        let config = new MatSnackBarConfig
        config.panelClass = ['green-snackbar'];
        config.verticalPosition = this.verticalPosition;
        config.horizontalPosition = this.horizontalPosition;
        config.duration = 1500;
        this._snackBar.open("Successfully modified", "", config);
        this.proForm.reset();
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