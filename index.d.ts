import { ApolloError } from "apollo-client";
import { DefinitionNode, Location } from "graphql";

import { OperationVariables, QueryResult } from "@apollo/react-common";
import {
    LazyQueryHookOptions, MutationHookOptions, MutationTuple, QueryHookOptions, QueryLazyOptions,
    SubscriptionHookOptions
} from "@apollo/react-hooks";

declare interface DocumentNode<D = any, V = any> {
  readonly kind: "Document";
  readonly loc?: Location;
  readonly definitions: ReadonlyArray<DefinitionNode>;
}
declare const _default: <D = any, V = any>(
  literals: any,
  ...placeholders: any[]
) => DocumentNode<D, V>;
export default _default;
declare module "graphql" {
  interface DocumentNode<D = any, V = any> {
    readonly kind: "Document";
    readonly loc?: Location;
    readonly definitions: ReadonlyArray<DefinitionNode>;
  }
}
declare module "graphql-tag" {
  export default function gql<D = any, V = any>(
    literals: any,
    ...placeholders: any[]
  ): DocumentNode<D, V>;
  function resetCaches(): void;
  function disableFragmentWarnings(): void;
}
declare module "@apollo/react-hooks" {
  function useQuery<TData = any, TVariables = OperationVariables>(
    query: DocumentNode<TData, TVariables>,
    options?: QueryHookOptions<TData, TVariables>
  ): QueryResult<TData, TVariables>;
  function useMutation<TData = any, TVariables = OperationVariables>(
    mutation: DocumentNode<TData, TVariables>,
    options?: MutationHookOptions<TData, TVariables>
  ): MutationTuple<TData, TVariables>;
  function useLazyQuery<TData = any, TVariables = OperationVariables>(
    query: DocumentNode<TData, TVariables>,
    options?: LazyQueryHookOptions<TData, TVariables>
  ): [
    (options?: QueryLazyOptions<TVariables> | undefined) => void,
    QueryResult<TData, TVariables>
  ];
  function useSubscription<TData = any, TVariables = OperationVariables>(
    subscription: DocumentNode<TData, TVariables>,
    options?: SubscriptionHookOptions<TData, TVariables>
  ): {
    variables: TVariables | undefined;
    loading: boolean;
    data?: TData | undefined;
    error?: ApolloError | undefined;
  };
}
