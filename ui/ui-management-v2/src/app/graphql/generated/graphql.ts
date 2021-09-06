export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
}


export interface Ingredient {
  amount?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  name: Scalars['String'];
}

export interface Query {
  ingredient: Ingredient;
  ingredients: Array<Ingredient>;
  recipe: Recipe;
  recipes: Array<Recipe>;
  version: Scalars['String'];
}


export interface QueryIngredientArgs {
  id: Scalars['String'];
}


export interface QueryIngredientsArgs {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
}


export interface QueryRecipeArgs {
  id: Scalars['String'];
}


export interface QueryRecipesArgs {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
}

export interface Recipe {
  creationDate: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  imagePath?: Maybe<Scalars['String']>;
  ingredients: Array<Scalars['String']>;
  name: Scalars['String'];
}
