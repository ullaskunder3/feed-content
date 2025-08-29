import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts($page: Int!, $limit: Int!) {
    posts(page: $page, limit: $limit) {
      id
      author
      content
      likes
      timestamp
    }
  }
`;

export const NEW_POST = gql`
  subscription {
    newPost {
      id
      author
      content
      likes
      timestamp
    }
  }
`;

export const LIKE_POST = gql`
  mutation LikePost($id: ID!) {
    likePost(id: $id) {
      id
      likes
    }
  }
`;
