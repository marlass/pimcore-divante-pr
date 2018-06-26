import React from 'react';
import { Query } from 'react-apollo';
import moment from 'moment';
import { userQuery } from './../queries/user';

export default class UserQuery extends React.Component {
  render() {
    return (
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
                      createdAt >= this.props.startDate &&
                      createdAt <= this.props.endDate &&
                      pr.state === 'OPEN'
                    ) {
                      return true;
                    } else if (
                      mergedAt >= this.props.startDate &&
                      mergedAt <= this.props.endDate &&
                      pr.state === 'MERGED'
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  } else if (this.props.startDate) {
                    if (
                      createdAt >= this.props.startDate &&
                      pr.state === 'OPEN'
                    ) {
                      return true;
                    } else if (
                      mergedAt >= this.props.startDate &&
                      pr.state === 'MERGED'
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  } else if (this.props.endDate) {
                    if (
                      createdAt <= this.props.endDate &&
                      pr.state === 'OPEN'
                    ) {
                      return true;
                    } else if (
                      mergedAt <= this.props.endDate &&
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
              );
              const pimcoreOpenPR = pullRequestsInDataRange.filter(
                pr =>
                  pr.repository.name === 'pimcore' &&
                  pr.repository.owner.login === 'pimcore' &&
                  pr.state === 'OPEN'
              );
              const nonPimcorePR = pullRequestsInDataRange.filter(
                pr =>
                  pr.repository.name !== 'pimcore' &&
                  pr.repository.owner.login !== 'pimcore' &&
                  pr.isCrossRepository
              );
              const nonPimcorePROpen = nonPimcorePR.filter(
                pr => pr.state === 'OPEN'
              );
              const nonPimcorePRMerged = nonPimcorePR.filter(
                pr => pr.state === 'MERGED'
              );
              return (
                this.props.children({ user, mergedPimcorePR: pimcorePR, openPimcorePR: pimcoreOpenPR, mergedOtherPR: nonPimcorePRMerged, openOtherPR: nonPimcorePROpen })
              );
            }
          }}
        </Query>
    );
  }
}
