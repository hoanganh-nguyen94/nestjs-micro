import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ExecuteGraphqlService } from '../services/execute-graphql.service';
import { Observable } from 'rxjs';
import { QueryRecipesDocs } from '../graphql/generated/queries';


@Injectable({
  providedIn: 'root'
})
export class RecipeApisService {

  constructor(private execute: ExecuteGraphqlService) {
  }


  recipes(): Observable<string> {
    return this.execute.runQuery({
      query: QueryRecipesDocs,
    }).pipe(map(({response}) => response));
  }

}
