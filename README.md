# graphql-tag-ts

[![npm version](https://badge.fury.io/js/graphql-tag-ts.svg)](https://badge.fury.io/js/graphql-tag-ts)

```shell
yarn add graphql-tag-ts
```

or

```shell
npm install graphql-tag-ts
```

This project is basically **strongly typed** [graphql-tag](https://github.com/apollographql/graphql-tag) using [Module augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html).

Just installing this package you will be able to inject the types in your query declarations, no need to declaring them elsewhere or having to declare them when calling your queries.

> queries file

```typescript
import gql, { DocumentNode } from "graphql-tag-ts";
import gql_two from "graphql-tag";
/**
 * You can import either version, this library
 * is only doing module augmentation
 * but using graphql-tag-ts is a safe bet
 */

export const query_one = gql<
  { hello: { world: string } },
  { variable: string }
>`
  query($variable: String!) {
    hello {
      world
    }
  }
`;

/**
 * You also can cast the DocumentNode type to the object.
 * This method is better if you don't want to lose
 * GraphQL query highlighting in your editor
 */

export const query_two: DocumentNode<
  { hello: { world: string } },
  { variable: string }
> = gql`
  query($variable: String!) {
    hello {
      world
    }
  }
`;
```

> application

```typescript
import { useQuery } from "@apollo/react-hooks";
import { query_one } from "./queries";

export default () => {
  // "data" is strongly typed!
  // data = { hello: { world: string } } | undefined
  const { data, loading } = useQuery(query_one, {
    // "variables" is strongly typed too!
    // variables = { variable: string } | undefined
    variables: {
      variable: "HelloWorld!"
    }
  });

  return <div>{loading ? "Loading..." : data?.hello.world ?? "Not found"}</div>;
};
```

## Functions available

---

The module augmentation needs to be specified for every function that is required, so as is right now we are augmenting:

From [**@apollo/react-hooks**](https://www.npmjs.com/package/@apollo/react-hooks)

- useQuery
- useMutation
- useLazyQuery
- useSubscription

From [**apollo-server-integration-testing**](https://github.com/zapier/apollo-server-integration-testing)

- query
- mutate

### If you want another library / function to be added please feel free to request it in [the issues](https://github.com/PabloSzx/graphql-tag-ts/issues) or send a pull request.

## Usage with [babel-plugin-graphql-tag](https://github.com/gajus/babel-plugin-graphql-tag)

---

To use [**babel-plugin-graphql-tag**](https://github.com/gajus/babel-plugin-graphql-tag) (_highly recommended_) all you need to specify is the **importName** configuration option in your babel configuration.

> .babelrc

```javascript
{
  ...
  "plugins": [
    ...
    ["babel-plugin-graphql-tag", { "importName": "graphql-tag-ts" }]
  ]
}

```
