# graphql-tag-ts

[![npm version](https://badge.fury.io/js/graphql-tag-ts.svg)](https://badge.fury.io/js/graphql-tag-ts)

This project is basically **strongly typed** [graphql-tag](https://github.com/apollographql/graphql-tag) using [Module augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html).

Just installing this package you will be able to inject the types in your query declarations, no need to declaring them elsewhere or having to declaring them when calling your queries.

> queries file

```typescript
import gql from 'graphql-tag-ts';
import gql_two from 'graphql-tag'; // you can import either version, this library is only doing module augmentation

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
export const query_two = gql_two<
  { hello: { world: string } },
  { variable: string }
>`
  query($variable: String!) {
    hello {
      world
    }
  }
`;
```

> application

```typescript
import { useQuery } from '@apollo/react-hooks';
import { query_one } from './queries';

export default () => {
  // "data" is strongly typed!
  // data = { hello: { world: string } } | undefined
  const { data, loading } = useQuery(query_one, {
    // "variables" is strongly typed too!
    // variables = { variable: string } | undefined
    variables: {
      variable: 'HelloWorld!',
    },
  });

  return <div>{loading ? 'Loading...' : data?.hello.world ?? 'Not found'}</div>;
};
```

## Functions available

---

The module augmentation needs to be specified for every function that is required, so as is right now we are augmenting:

From **@apollo/react-hooks**

- useQuery
- useMutation
- useLazyQuery
- useSubscription

### If you want another library / function to be added please feel free to request in it [the issues](https://github.com/PabloSzx/graphql-tag-ts/issues) or send a pull request.
