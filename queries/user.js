import gql from 'graphql-tag';

export const userQuery = gql`
  query User($user: String!) {
    user(login: $user) {
      id
      login
      name
      pullRequests(last: 100) {
        nodes {
          id
          title
          state
          body: bodyText
          mergedAt
          createdAt
          url
          isCrossRepository
          author {
            login
          }
          authorAssociation
          url
          repository {
            id
            name
            owner {
              login
              ... on User {
                name
                id
              }
              ... on Organization {
                id
              }
            }
            nameWithOwner
          }
        }
        totalCount
      }
    }
  }
`;
