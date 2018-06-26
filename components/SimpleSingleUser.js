import React from 'react';
import Link from 'next/link';
import UserQuery from './UserQuery';

export default class SingleUser extends React.Component {
  render() {
    return (
      <>
        <UserQuery
          user={this.props.user}
          startDate={this.props.startDate}
          endDate={this.props.endDate}
        >
          {({
            user,
            mergedPimcorePR,
            openPimcorePR,
            mergedOtherPR,
            openOtherPR,
          }) => (
            <div className="user">
              <h2>
                <Link
                  href={`/user?login=${user.login}&startDate=${
                    this.props.startDate
                  }&endDate=${this.props.endDate}`}
                >
                  <a>{`${user.name ? user.name : ''} / ${user.login}`}</a>
                </Link>
              </h2>
              <h3>Pimcore PR</h3>
              <h4>{`Merged: ${mergedPimcorePR.length} / Open: ${
                openPimcorePR.length
              }`}</h4>
              <h3>Other Pull requests</h3>
              <h4>{`Merged: ${mergedOtherPR.length} / Open: ${
                openOtherPR.length
              }`}</h4>
            </div>
          )}
        </UserQuery>
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
