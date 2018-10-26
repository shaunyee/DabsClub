import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { SIGNUP_USER, SIGNIN_USER, GET_ALL_USERS} from '../../queries';
import { signIn } from '../../Utilities/loginUtils';

const initialState = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: ""
}

class Signup extends Component {
    state = { ...initialState };

    clearState = () => {
        this.setState({...initialState})
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleSubmit = async (event, signupEmailUser, authenticateEmailUser) => {
        event.preventDefault();
        try {
            await signupEmailUser().then(async ({ data }) => {
                await this.props.refetch();
            });
            authenticateEmailUser().then( ({ data }) => {
                signIn(data.authenticateEmailUser.token);
                this.props.refetch();
                this.clearState();
                this.props.history.push('/profile')
            });
        } catch (e) {
        }
      };

    validateForm = () => {
        const { email, password, passwordConfirmation } =this.state;
        const isInvalid = !email || !password || password !== passwordConfirmation;
        return isInvalid;
    }
  render() {
      const { username, email, password, passwordConfirmation } = this.state;
      console.log(this.props);
    return (
      <div className="App">
        <h2 className="App">Signup</h2>
        <Mutation 
        mutation={SIGNIN_USER} 
        variables={{ email, password }} 
        >
        {(authenticateEmailUser, { data, loading, error }) => {
            if(loading) return null;
        return (
        <Mutation 
        mutation={SIGNUP_USER} 
        variables={{ username, email, password }} 
        refetchQueries={() => [{query: GET_ALL_USERS}]}
        >
            {( signupEmailUser, { data, loading, error }) => {
                return(
                <form className="form" onSubmit={event => this.handleSubmit(event, signupEmailUser, authenticateEmailUser)} >
                    <input type="text" name="username" placeholder="Username" value={username} onChange={this.handleChange} />
                    <input type="email" name="email" placeholder="Email Adress" value={email} onChange={this.handleChange} />
                    <input type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange} />
                    <input type="password" name="passwordConfirmation" placeholder="Confirm Password" value={passwordConfirmation} onChange={this.handleChange} />
                    <button disabled={loading || this.validateForm()} type="submit" className="button-primary">Submit</button>
                    {error && <div>Error</div>}
                </form>
                )
            }}
        </Mutation>
        )
        }}
        </Mutation>
      </div>
    )
  }
}
export default withRouter(Signup);