import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, filter, flatMap, tap, take } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Injectable()
export class TypesService {
  private cache: any;

  constructor (private http: HttpClient) {}

  find (bustCache = false) {
    if (this.cache && !bustCache) {
      return of(this.cache);
    }
    return this.http.get('http://localhost:4201/types').pipe(
      tap((data) => this.cache = data)
    );
  }

  get (id: string) {
    const data = this.cache ? of(this.cache) : this.http.get('http://localhost:4201/types');
    return data.pipe(
      flatMap((x) => x as any),
      filter((data: any) => data.rdfType === id),
      take(1),
    );
  }

  typeToFormGroup (type) {
    let group: any = {};

    // [{"label":"Name","maxLength":50,"inputType":"text","schema":"xsd:string","rdfField":"schema_name"},
    type.inputs.forEach(input => {
      if (input.inputType === 'bool') {
        group[input.rdfField] = new FormControl('');
      } else {
        group[input.rdfField] = new FormControl('', Validators.required);
      }
    });
    return new FormGroup(group);
  }
}
