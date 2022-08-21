import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/services/confirm.service';
import { EducationService } from 'src/app/services/education.service';
import { EduDialogComponent } from './edu-dialog/edu-dialog.component';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  educations: any = [];
  constructor(
    private educationService: EducationService,
    public afAuth: AngularFireAuth,
    public dialog: MatDialog,
    private confirm: ConfirmService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.listarEducation();
  }

  openAddEdu() {
    this.dialog.open(EduDialogComponent, {
      panelClass: "dialog-responsive",
    });
  }

  openEditEdu(education: any) {
    this.dialog.open(EduDialogComponent, {
      panelClass: "dialog-responsive",
      data: education
    })
  }

  openDeleteEdu(id: number) {
    this.confirm
      .confirmDialog({
        title: 'Delete education',
        message: 'Are you sure to delete this education?',
        confirmCaption: 'Yes',
        cancelCaption: 'No',
      })
      .subscribe((yes) => {
        if (yes) this.educationService.deleteEducation(id).subscribe(
          res => {
            this.ngOnInit();
            let config = new MatSnackBarConfig
            config.panelClass = ['green-snackbar'];
            config.verticalPosition = this.verticalPosition;
            config.horizontalPosition = this.horizontalPosition;
            config.duration = 1500;
            this._snackBar.open("Removed successfully", "", config);
          },
          err => console.log(err)
        );
      });
  }

  listarEducation() {
    this.educationService.getEducation().subscribe(
      res => {
        this.educations = res;
        console.log(res);
      },
      err => console.log(err)
    );
  }
}