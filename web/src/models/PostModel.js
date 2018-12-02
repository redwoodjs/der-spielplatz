import { gql } from 'src/lib/graphql';

class PostModel {
  static postFromSlug = slug => ({
    query: gql`
      query Post($slug: String!) {
        post(slug: $slug) {
          id
          title
          text
          createdAt
          category {
            name
            slug
          }
        }
      }
    `,
    variables: { slug },
    errorPolicy: 'all',
  })
}

export default PostModel;
