import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts($after: ID, $limit: Int!) {
    posts(after: $after, limit: $limit) {
      id
      title
      content
      author
      likes
      createdAt
    }
  }
`;

export const ADD_POST = gql`
  mutation AddPost($title: String!, $content: String!, $author: String!) {
    addPost(title: $title, content: $content, author: $author) {
      id
      title
      content
      author
      likes
      createdAt
    }
  }
`;

export const LIKE_POST = gql`
  mutation LikePost($id: ID!, $user: String!) {
    likePost(id: $id, user: $user) {
      id
      likes
      likedBy
    }
  }
`;

export const POST_ADDED = gql`
  subscription OnPostAdded {
    postAdded {
      id
      title
      content
      author
      likes
      createdAt
    }
  }
`;

export const POST_LIKED = gql`
  subscription OnPostLiked {
    postLiked {
      id
      likes
      likedBy
    }
  }
`;
