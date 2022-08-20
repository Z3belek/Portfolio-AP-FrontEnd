import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutmeService {
  url = "https://portfolio-ap-v2.herokuapp.com/api/aboutme"
  constructor(private http: HttpClient) { }

  getAboutme(): Observable<any> {
    return this.http.get<Aboutme[]>(this.url);
  }

  editAboutme(id: number, aboutme: Aboutme): Observable<any> {
    return this.http.put(this.url + '/' + id, aboutme);
  }
}

export interface Aboutme {
  dtext: string,
  percentage1: number,
  percentage2: number,
  percentage3: number,
  tpercentage1: string,
  tpercentage2: string,
  tpercentage3: string,
}