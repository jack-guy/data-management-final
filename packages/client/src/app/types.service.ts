import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, filter, flatMap, tap, take } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';


@Injectable()
export class TypesService {
  constructor (private http: HttpClient) {}

  find () {
    return this.http.get('http://localhost:4201/types');
  }

  get (id: string) {
    return this.http.get('http://localhost:4201/types').pipe(
      flatMap((x) => x as any),
      filter((data: any) => data.rdfType === id),
      take(1),
    );
  }
}
