import { gql } from 'src/lib/graphql';

export const allCategories = () => ({
  query: gql`
    query allCategories {
        categories {
        id
        name
        slug
        posts {
          id
          title
        }
      }
    }
    `,
  errorPolicy: 'all',
});
