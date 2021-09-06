import gql from 'graphql-tag';

export const QueryIngredientDocs = gql`
    query Ingredient($id: String!) {
  response: ingredient(id: $id) {
    id
    name
  }
}
    `;
export const QueryIngredientsDocs = gql`
    query Ingredients($skip: Int, $take: Int) {
  response: ingredients(skip: $skip, take: $take) {
    id
    name
  }
}
    `;
export const QueryRecipesDocs = gql`
    query Recipes {
  response: recipes {
    id
    name
  }
}
    `;
export const QueryVersionDocs = gql`
    query Version {
  response: version
}
    `;