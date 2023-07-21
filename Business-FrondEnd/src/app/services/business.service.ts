import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Business } from '../interface/business';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  apiUrl: string = environment.endPoint + 'api/Business';

  constructor(private http: HttpClient) { }

  getBusiness(): Observable<Business[]>{
    return this.http.get<Business[]>(`${this.apiUrl}`)

  }

  getBusinessById(id: Number): Observable<Business>{
    return this.http.get<Business>(`${this.apiUrl}/${id}`)
  }

  deleteBusiness(id: Number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }

  createBusiness(business: Business): Observable<Business>{
    return this.http.post<Business>(`${this.apiUrl}`,business)
  }

  updateBusiness(id: Number, business: Business): Observable<void>{
    return this.http.put<void>(`${this.apiUrl}/${id}`,business)
  }
}
