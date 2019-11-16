import gql from "../src";

const query = gql<{ hello: { world: string } }, { variable: string }>`
  query($variable: String!) {
    hello {
      world
    }
  }
`;

describe('graphql-tag-ts', () => {
  it('works', () => {
    expect(query.kind).toBe('Document');
  });
});
