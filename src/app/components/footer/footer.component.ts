import { Component, OnInit } from '@angular/core';
import { navbarData } from 'src/app/navbar/nav-data';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  navData = navbarData;
  constructor() { }

  ngOnInit(): void {
  }

}
