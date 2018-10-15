import React from 'react';
import { withRouter } from 'react-router-dom';
import { ApolloConsumer } from 'react-apollo';
import { signOut } from '../../Utilities/loginUtils';

const handleSignout = (client, history) => {
    signOut()
;    client.resetStore();
    history.push('/');
}

const Signout = ({ history }) => (
    <ApolloConsumer>
    {client => {
        return (
        <button className="rounded" onClick={() => handleSignout(client, history)}>SignOut</button>
        )
    }}
    </ApolloConsumer>
)
export default withRouter(Signout);