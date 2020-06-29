import { DefinitionNode, Location } from "graphql";

type DefaultOperationVariables = {
  [x: string]: any;
};

export interface DocumentNode<D = any, V = any> {
  readonly kind: "Document";
  readonly loc?: Location;
  readonly definitions: ReadonlyArray<DefinitionNode>;
}

export * from "graphql-tag";

declare const gql: <D = any, V = any>(
  literals: ReadonlyArray<string> | Readonly<string>,
  ...placeholders: any[]
) => DocumentNode<D, V>;
export default gql;

declare module "graphql" {
  interface DocumentNode<D = any, V = any> {
    readonly kind: "Document";
    readonly loc?: Location;
    readonly definitions: ReadonlyArray<DefinitionNode>;
  }
}
declare module "graphql-tag" {
  export default function gql<D = any, V = any>(
    literals: ReadonlyArray<string> | Readonly<string>,
    ...placeholders: any[]
  ): DocumentNode<D, V>;
  export function resetCaches(): void;
  export function disableFragmentWarnings(): void;
  export function enableExperimentalFragmentVariables(): void;
  export function disableExperimentalFragmentVariables(): void;
}
declare module "@apollo/react-hooks" {
  export function useQuery<TData = any, TVariables = DefaultOperationVariables>(
    query: DocumentNode<TData, TVariables>,
    options?: import("@apollo/react-hooks").QueryHookOptions<TData, TVariables>
  ): import("@apollo/react-common").QueryResult<TData, TVariables>;

  export function useMutation<
    TData = any,
    TVariables = DefaultOperationVariables
  >(
    mutation: DocumentNode<TData, TVariables>,
    options?: import("@apollo/react-hooks").MutationHookOptions<
      TData,
      TVariables
    >
  ): import("@apollo/react-hooks").MutationTuple<TData, TVariables>;

  export function useLazyQuery<
    TData = any,
    TVariables = DefaultOperationVariables
  >(
    query: DocumentNode<TData, TVariables>,
    options?: import("@apollo/react-hooks").LazyQueryHookOptions<
      TData,
      TVariables
    >
  ): import("@apollo/react-hooks").QueryTuple<TData, TVariables>;

  export function useSubscription<
    TData = any,
    TVariables = DefaultOperationVariables
  >(
    subscription: DocumentNode<TData, TVariables>,
    options?: import("@apollo/react-hooks").SubscriptionHookOptions<
      TData,
      TVariables
    >
  ): {
    variables: TVariables | undefined;
    loading: boolean;
    data?: TData | undefined;
    error?: import("apollo-client").ApolloError | undefined;
  };
}

declare module "apollo-server-integration-testing" {
  type Query = <T extends object = {}, V extends object = {}>(
    operation: string | DocumentNode<T, V>,
    variablesOptions?: import("apollo-server-integration-testing").Options<V>
  ) => Promise<{ data: T }>;
  function createTestClient(
    config: import("apollo-server-integration-testing").TestClientConfig
  ): {
    query: import("apollo-server-integration-testing").Query;
    mutate: import("apollo-server-integration-testing").Query;
    setOptions: import("apollo-server-integration-testing").TestSetOptions;
  };
}
