import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getEmployee() {
    return this.http.get<any>('http://localhost:3000/posts');
  }
  postEmployee(data: any) {
    return this.http.post<any>(' http://localhost:3000/posts', data);
  }
  updateEmployee(data: any, id: number) {
    return this.http.put<any>(' http://localhost:3000/posts/' + id, data);
  }
  deleteEmployee(id: number) {
    return this.http.delete<any>(' http://localhost:3000/posts/' + id);
  }
}
