import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class TypesService {
  constructor (private http: HttpClient) {}

  find () {
    return this.http.get('http://localhost:4201/types');
  }
}
