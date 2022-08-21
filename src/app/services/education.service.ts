import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  url = "https://portfolio-ap-v2.herokuapp.com/api/education"

  constructor(private http: HttpClient) { }

  getEducation(): Observable<any> {
    return this.http.get<Education[]>(this.url);
  }

  getOneEducation(id: number): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }

  saveEducation(education: Education): Observable<Education> {
    return this.http.post<Education>(this.url, education);
  }

  editEducation(id: number, education: Education): Observable<any> {
    return this.http.put(this.url + '/' + id, education);
  }

  deleteEducation(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}

export interface Education {
  id?: number,
  type: string,
  title: string,
  institution: string,
  imgurl: string,
  haveurl: boolean,
  urlcertificate: string,
  dtext: string
}