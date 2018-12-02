import { gql } from 'src/lib/graphql';

export const postFromSlug = slug => ({
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

export const updatePost = () => ({
  mutation: gql`
    mutation updatePost($post: PostUpdateInput!) {
      postUpdate(post: $post) {
        id
      }
    }
  `,
});
