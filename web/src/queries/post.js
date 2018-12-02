import { gql } from 'src/lib/graphql';

export default class post {
  static postFromSlug = slug => ({
    query: gql`
      query postFromSlug($slug: String!) {
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
  });

  static updatePost = () => ({
    mutation: gql`
      mutation updatePost($post: PostUpdateInput!) {
        postUpdate(post: $post) {
          id
        }
      }
    `,
  });
}
