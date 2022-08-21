import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/services/confirm.service';
import { ProjectService } from 'src/app/services/project.service';
import { ProDialogComponent } from './pro-dialog/pro-dialog.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  projects: any = [];
  constructor(
    private projectService: ProjectService,
    public afAuth: AngularFireAuth,
    public dialog: MatDialog,
    private confirm: ConfirmService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.listarProject();
  }

  openAddProject() {
    this.dialog.open(ProDialogComponent, {
      panelClass: "dialog-responsive"
    });
  }

  openEditProject(project: any) {
    this.dialog.open(ProDialogComponent, {
      panelClass: "dialog-responsive",
      data: project
    })
  }

  openDeleteProject(id: number) {
    this.confirm
      .confirmDialog({
        title: 'Delete project',
        message: 'Are you sure to delete this project?',
        confirmCaption: 'Yes',
        cancelCaption: 'No',
      })
      .subscribe((yes) => {
        if (yes) this.projectService.deleteProject(id).subscribe(
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

  listarProject() {
    this.projectService.getProject().subscribe(
      res => {
        this.projects = res;
        console.log(res);
      },
      err => console.log(err)
    );
  }
}