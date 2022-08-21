import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutmeService {
  url = "https://portfolio-ap-v2.herokuapp.com/api/aboutme"
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getAboutme(): Observable<any> {
    return this.http.get<Aboutme[]>(this.url);
  }

  editAboutme(aboutme: Aboutme): Observable<any> {
    return this.http.put<Aboutme[]>(this.url + '/' + '1', aboutme);
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