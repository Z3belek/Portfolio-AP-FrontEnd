import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { navbarData } from './nav-data';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  navData = navbarData;
  isActive = false;
  constructor(
    public dialog: MatDialog,
    public afAuth: AngularFireAuth
  ) { }

  ngOnInit(): void {
  }

  loginB() {
    this.dialog.open(LoginComponent, {
      panelClass: "dialog-responsive"
    })
  }

  logout() {
    this.afAuth.signOut();
    window.location.reload();
  }
}
