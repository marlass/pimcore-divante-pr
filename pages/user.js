import React from 'react';
import UserQuery from '../components/UserQuery';
import UserDetails from './../components/User';
import App from './../components/App';

export default class User extends React.Component {
  static async getInitialProps({ query }) {
    return { query: query };
  }

  render() {
    return (
      <App>
        <UserQuery
          user={this.props.query.login}
          startDate={this.props.query.startDate}
          endDate={this.props.query.endDate}
        >
          {props => <UserDetails {...props} />}
        </UserQuery>
      </App>
    );
  }
}
