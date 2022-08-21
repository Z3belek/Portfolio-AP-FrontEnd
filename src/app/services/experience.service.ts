import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  url = "https://portfolio-ap-v2.herokuapp.com/api/experience"

  constructor(private http: HttpClient) { }

  getExperience(): Observable<any> {
    return this.http.get<Experience[]>(this.url);
  }

  getOneExperience(id: number): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }

  saveExperience(experience: Experience): Observable<Experience> {
    return this.http.post<Experience>(this.url, experience);
  }

  editExperience(id: number, experience: Experience): Observable<any> {
    return this.http.put(this.url + '/' + id, experience);
  }

  deleteExperience(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}

export interface Experience {
  id?: number,
  role: string,
  place: string,
  year1: string,
  year2: string,
  technologies: string[],
  responsibilities: string[]
}