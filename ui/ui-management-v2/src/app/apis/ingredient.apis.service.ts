import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ExecuteGraphqlService } from '../services/execute-graphql.service';
import { Observable } from 'rxjs';
import { QueryIngredientsDocs } from '../graphql/generated/queries';


@Injectable({
  providedIn: 'root'
})
export class IngredientApisService {

  constructor(private execute: ExecuteGraphqlService) {
  }


  ingredients(): Observable<string> {
    return this.execute.runQuery({
      query: QueryIngredientsDocs,
    }).pipe(map(({response}) => response));
  }

}
