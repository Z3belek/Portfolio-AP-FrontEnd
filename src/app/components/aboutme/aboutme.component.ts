import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { Aboutme, AboutmeService } from 'src/app/services/aboutme.service';
import { AboutDialogComponent } from './about-dialog/about-dialog.component';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.scss']
})
export class AboutmeComponent implements OnInit {
  aboutmes: Aboutme = {
    dtext: '',
    percentage1: 0,
    percentage2: 0,
    percentage3: 0,
    tpercentage1: '',
    tpercentage2: '',
    tpercentage3: '',
  }
  constructor(
    private aboutmeService: AboutmeService,
    public dialog: MatDialog,
    public afAuth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.listarAboutme();
  }

  openEditAboutme(aboutme: any) {
    this.dialog.open(AboutDialogComponent, {
      panelClass: "dialog-responsive",
      data: aboutme
    })
  }

  listarAboutme() {
    this.aboutmeService.getAboutme().subscribe(
      (aboutmes) => (this.aboutmes = aboutmes[0]
    ));
  }
}