import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppServiceService {
  constructor(private readonly http: HttpClient) {}
  checkUserName(userName:string): Observable<boolean> {
    const _url = `https://www.reddit.com/api/username_available.json?user=${userName}`;
    return this.http.get<boolean>(_url);
  }
}
