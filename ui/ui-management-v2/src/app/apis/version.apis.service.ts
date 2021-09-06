import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ExecuteGraphqlService } from '../services/execute-graphql.service';
import { Observable } from 'rxjs';
import { QueryVersionDocs } from '../graphql/generated/queries';


@Injectable({
  providedIn: 'root'
})
export class VersionApisService {

  constructor(private execute: ExecuteGraphqlService) {
  }


  version(): Observable<string> {
    return this.execute.runQuery({
      query: QueryVersionDocs,
    }).pipe(map(({response}) => response));
  }

}
