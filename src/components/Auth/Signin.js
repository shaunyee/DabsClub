import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Mutation } from 'react-apollo';
import { SIGNIN_USER } from '../../queries';
import { signIn } from '../../Utilities/loginUtils'

const initialState = {
  email: "",
  password: ""
}

class Signin extends Component {
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

  handleSubmit = (event, signinUser) => {
      event.preventDefault();
      signinUser().then(async ({ data }) => {
          signIn(data.signinUser.token);
          await this.props.refetch();
          this.clearState();
          this.props.history.push('/profile')
      });
  };

  validateForm = () => {
      const { email, password } =this.state;
      const isInvalid = !email || !password;
      return isInvalid;
  }

render() {
    const { email, password } =this.state;
  return (
    <div className="App">
      <h2 className="App">Signin</h2>
      <Mutation mutation={SIGNIN_USER} variables={{ email, password }}>
          {( signinUser, { data, loading, error }) => {
              return(
              <form className="form" onSubmit={event => this.handleSubmit(event, signinUser)} >
                  <input type="text" name="email" placeholder="email" value={email} onChange={this.handleChange} />
                  <input type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange} />
                  <button disabled={loading || this.validateForm()} type="submit" className="button-primary">Submit</button>
                  {error && <div>Error</div>}
              </form>
              )
          }}
      </Mutation>
    </div>
  )
}
}
export default withRouter(Signin);