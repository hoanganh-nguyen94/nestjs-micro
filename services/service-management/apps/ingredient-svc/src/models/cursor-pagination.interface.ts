export interface IEdge<T> {
  node: T;
}

export interface IFindPayload<T> {
  edges: IEdge<T>[];
}
