import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GraphService {

  constructor (private http: HttpClient) {}

  create (rdfType: string, iriPath: string, data: any) {
    return this.http.post(`http://localhost:4201/create/${rdfType}`, {
      iriPath,
      data
    });
  }

  delete (rdfType: string, identifierMap) {
    return this.http.post(
      `http://localhost:4201/delete/${rdfType}`,
      identifierMap
    );
  }
}
