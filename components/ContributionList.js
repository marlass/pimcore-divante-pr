import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import SingleUser from './../components/SingleUser';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import './../styles.css';
import SimpleSingleUser from './../components/SimpleSingleUser';

const listQuery = gql`
  {
    repository(name: "pimcore", owner: "pimcore") {
      nameWithOwner
      mentionableUsers(last: 100) {
        nodes {
          login
          company
        }
      }
    }
  }
`;

export default class ContributionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      focusedInput: null,
      members: [
        'kkirsz',
        'kkarkus',
        'adrozdek',
        'mgomse',
        'aopalinski',
        'bidzikowski6',
        'cwiecekpiotr',
        'filip-modlinski',
        'johnzuk',
        'kubaplas',
        'marcindyguda',
        'mbolka',
        'michalfilik',
        'mischief24',
        'marlass',
        'MonikaLit',
        'Pitu-pl',
        'wpeisert',
        'zavodyanka',
      ],
    };
  }
  render() {
    return (
      <div className="hello">
        <h1>Pull requests by Snippety Zagłady</h1>
        <DateRangePicker
          startDate={this.state.startDate} // momentPropTypes.momentObj or null,
          startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
          endDate={this.state.endDate} // momentPropTypes.momentObj or null,
          endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
          onDatesChange={({ startDate, endDate }) =>
            this.setState({ startDate, endDate })
          } // PropTypes.func.isRequired,
          focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          enableOutsideDays={true}
          isDayBlocked={() => false}
          isOutsideRange={() => false}
          onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
        />
        {this.state.members.map(user => (
          <SimpleSingleUser
            key={user}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            user={user}
          />
        ))}
        {/* <Query query={listQuery} ssr={false}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return data.repository.mentionableUsers.nodes
              .filter(
                ({ login, company }) =>
                  company && company.trim() === '@DivanteLtd'
              )
              .map(({ login, company }) => (
                <SingleUser user={login} key={login} />
              ));
          }}
        </Query> */}
        <style jsx>
          {`
            * {
              text-align: left;
            }

            h1,
            h2 {
              font-weight: normal;
              margin: 10px;
              margin-bottom: 60px;
            }
            a {
              color: #42b983;
            }
          `}
        </style>
      </div>
    );
  }
}
