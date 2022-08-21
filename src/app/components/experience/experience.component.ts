import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/services/confirm.service';
import { ExperienceService } from 'src/app/services/experience.service';
import { ExpDialogComponent } from './exp-dialog/exp-dialog.component';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  experiences: any = [];

  constructor(
    private experienceService: ExperienceService,
    public afAuth: AngularFireAuth,
    public dialog: MatDialog,
    private confirm: ConfirmService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.listarExperience();
  }

  openAddExp() {
    this.dialog.open(ExpDialogComponent, {
      panelClass: "dialog-responsive",
    });
  }

  openEditExp(experience: any) {
    this.dialog.open(ExpDialogComponent, {
      panelClass: "dialog-responsive",
      data: experience
    })
  }

  openDeleteExp(id: number) {
    this.confirm
      .confirmDialog({
        title: 'Delete experience',
        message: 'Are you sure to delete this Experience?',
        confirmCaption: 'Yes',
        cancelCaption: 'No',
      })
      .subscribe((yes) => {
        if (yes) this.experienceService.deleteExperience(id).subscribe(
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

  listarExperience() {
    this.experienceService.getExperience().subscribe(
      res => {
        this.experiences = res;
        console.log(res);
      },
      err => console.log(err)
    );
  }
}