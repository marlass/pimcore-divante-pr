import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import moment from 'moment';

const userQuery = gql`
  query User($user: String!) {
    user(login: $user) {
      login
      name
      pullRequests(last: 100) {
        nodes {
          title
          state
          body
          mergedAt
          createdAt
          isCrossRepository
          author {
            login
          }
          authorAssociation
          url
          repository {
            name
            owner {
                login
              ... on User {
                name
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

export default class SingleUser extends React.Component {
  render() {
    return (
      <>
        <Query
          query={userQuery}
          variables={{ user: this.props.user }}
          ssr={false}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            else if (error) return <p>Error :(</p>;
            else {
              const user = data.user;
              const pullRequestsInDataRange = user.pullRequests.nodes.filter(
                pr => {
                  const createdAt = moment(pr.createdAt).unix();
                  const mergedAt = moment(pr.mergedAt).unix();
                  if (this.props.startDate && this.props.endDate) {
                    if (
                      createdAt >= this.props.startDate.unix() &&
                      createdAt <= this.props.endDate.unix() &&
                      pr.state === 'OPEN'
                    ) {
                      return true;
                    } else if (
                      mergedAt >= this.props.startDate.unix() &&
                      mergedAt <= this.props.endDate.unix() &&
                      pr.state === 'MERGED'
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  } else if (this.props.startDate) {
                    if (
                      createdAt >= this.props.startDate.unix() &&
                      pr.state === 'OPEN'
                    ) {
                      return true;
                    } else if (
                      mergedAt >= this.props.startDate.unix() &&
                      pr.state === 'MERGED'
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  } else if (this.props.endDate) {
                    if (
                      createdAt <= this.props.endDate.unix() &&
                      pr.state === 'OPEN'
                    ) {
                      return true;
                    } else if (
                      mergedAt <= this.props.endDate.unix() &&
                      pr.state === 'MERGED'
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  } else {
                    return true;
                  }
                }
              );
              const pimcorePR = pullRequestsInDataRange.filter(
                pr =>
                  pr.repository.name === 'pimcore' &&
                  pr.repository.owner.login === 'pimcore' &&
                  pr.state === 'MERGED'
              ).length;
              const pimcoreOpenPR = pullRequestsInDataRange.filter(
                pr =>
                  pr.repository.name === 'pimcore' &&
                  pr.repository.owner.login === 'pimcore' &&
                  pr.state === 'OPEN'
              ).length;
              const nonPimcorePR = pullRequestsInDataRange.filter(
                  pr => pr.repository.name !== 'pimcore' && pr.repository.owner.login !=='pimcore' && pr.isCrossRepository
              );
              const nonPimcorePROpen = nonPimcorePR.filter(pr => pr.state === 'OPEN').length;
              const nonPimcorePRMerged = nonPimcorePR.filter(pr => pr.state === 'MERGED').length;
              return (
                <div className="user">
                  <h2>
                    {user.name} / {user.login}
                  </h2>
                  <h3>Pimcore PR</h3>
                  <h4>{`Merged: ${pimcorePR} / Open: ${pimcoreOpenPR}`}</h4>
                  <h3>Other Pull requests</h3>
                  <h4>{`Merged: ${nonPimcorePRMerged} / Open: ${nonPimcorePROpen}`}</h4>
                </div>
              );
            }
          }}
        </Query>
        <style jsx="true">
          {`
            .user {
              margin: 10px;
              border-bottom: 1px solid #999;
            }
          `}
        </style>
      </>
    );
  }
}
