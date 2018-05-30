import React from "react"
import gql from "graphql-tag"
import { Query } from "react-apollo"

const userQuery = gql`
  query User($user: String!) {
    user(login: $user) {
      login
      name
      pullRequests(last: 100) {
        nodes {
          title
          state
          repository {
            name
            owner {
              login
            }
          }
        }
      }
    }
  }
`

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
            if (loading) return <p>Loading...</p>
            else if (error) return <p>Error :(</p>
            else {
              const user = data.user
              const pimcorePR = user.pullRequests.nodes.filter(
                pr =>
                  pr.repository.name === "pimcore" &&
                  pr.repository.owner.login === "pimcore" &&
                  pr.state === "MERGED"
              ).length
              const pimcoreOpenPR = user.pullRequests.nodes.filter(
                pr =>
                  pr.repository.name === "pimcore" &&
                  pr.repository.owner.login === "pimcore" &&
                  pr.state === "OPEN"
              ).length
              return (
                <div className="user">
                  <h2>
                    {user.name} / {user.login}
                  </h2>
                  {[...Array(pimcorePR).keys()].map(key => (
                    <span key={key}>🍕</span>
                  ))}
                  {[...Array(pimcoreOpenPR).keys()].map(key => (
                    <span key={key}>📦</span>
                  ))}
                  <h3>{`Merged: ${pimcorePR} / Open: ${pimcoreOpenPR}`}</h3>
                </div>
              )
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
    )
  }
}
