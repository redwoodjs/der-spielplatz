import { gql } from 'src/lib/graphql';

export default class category {
    static allCategories = () => ({
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
    })
}
