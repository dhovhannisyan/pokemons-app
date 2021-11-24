import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpCommonService {

  constructor(private httpClient: HttpClient) {}

  get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(`${environment.baseUrl}${url}`);
  }

  post<T>(url: string, body: Object): Observable<T> {
    return this.httpClient.post<T>(`${environment.baseUrl}${url}`, body);
  }

  patch<T>(url: string, body: Object): Observable<T> {
    return this.httpClient.patch<T>(`${environment.baseUrl}${url}`, body);
  }

  put<T>(url: string, body: Object): Observable<T> {
    return this.httpClient.put<T>(`${environment.baseUrl}${url}`, body);
  }

  upload<T>(url: string, file: File): Observable<T> {
    const formData = new FormData();
    formData.append('image', file, file.name);
    return this.httpClient.post<T>(`${environment.baseUrl}${url}`, formData);
  }

}
