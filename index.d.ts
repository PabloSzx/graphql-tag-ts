import { ApolloError } from "apollo-client";
import { DefinitionNode, Location } from "graphql";

import { OperationVariables, QueryResult } from "@apollo/react-common";
import {
  LazyQueryHookOptions,
  MutationHookOptions,
  MutationTuple,
  QueryHookOptions,
  QueryLazyOptions,
  SubscriptionHookOptions,
} from "@apollo/react-hooks";
import {
  Options,
  TestClientConfig,
  TestSetOptions,
} from "apollo-server-integration-testing";

export interface DocumentNode<D = any, V = any> {
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
  function useQuery<
    TData = any,
    TVariables = OperationVariables,
    TData2 = TData,
    TVariables2 = TVariables
  >(
    query: DocumentNode<TData, TVariables>,
    options?: QueryHookOptions<TData2, TVariables2>
  ): QueryResult<TData, TVariables>;
  function useMutation<
    TData = any,
    TVariables = OperationVariables,
    TData2 = TData,
    TVariables2 = TVariables
  >(
    mutation: DocumentNode<TData, TVariables>,
    options?: MutationHookOptions<TData2, TVariables2>
  ): MutationTuple<TData, TVariables>;
  function useLazyQuery<
    TData = any,
    TVariables = OperationVariables,
    TData2 = TData,
    TVariables2 = TVariables
  >(
    query: DocumentNode<TData, TVariables>,
    options?: LazyQueryHookOptions<TData2, TVariables2>
  ): [
    (options?: QueryLazyOptions<TVariables> | undefined) => void,
    QueryResult<TData, TVariables>
  ];
  function useSubscription<
    TData = any,
    TVariables = OperationVariables,
    TData2 = TData,
    TVariables2 = TVariables
  >(
    subscription: DocumentNode<TData, TVariables>,
    options?: SubscriptionHookOptions<TData2, TVariables2>
  ): {
    variables: TVariables | undefined;
    loading: boolean;
    data?: TData | undefined;
    error?: ApolloError | undefined;
  };
}

declare module "apollo-server-integration-testing" {
  type Query = <T extends object = {}, V extends object = {}>(
    operation: string | DocumentNode<T, V>,
    variablesOptions?: Options<V>
  ) => Promise<{ data: T }>;
  function createTestClient(
    config: TestClientConfig
  ): {
    query: Query;
    mutate: Query;
    setOptions: TestSetOptions;
  };
}
