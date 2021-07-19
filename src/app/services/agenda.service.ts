import { element } from 'protractor';
import { AgendaExame } from 'src/app/models/AgendaExame';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  baseUrl = 'http://localhost:8080/agenda';

  constructor(private http: HttpClient) { }

  getAgenda(): Observable<AgendaExame[]> {
    return this.http.get<AgendaExame[]>(this.baseUrl);
  }

  createElement(element: AgendaExame): Observable<AgendaExame> {
    return this.http.post<AgendaExame>(this.baseUrl, element);
  }

  editElement(element: AgendaExame): Observable<AgendaExame>{
    return this.http.put<AgendaExame>(this.baseUrl, element);
  }

  deleteElement(id: number): Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/${id}`)
  }


}
