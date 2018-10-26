import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom'
import { Mutation } from 'react-apollo';
import { SIGNIN_USER } from '../../queries';
import { signIn } from '../../Utilities/loginUtils';
import styled from 'styled-components';

const LinkStyle = styled.p`
 display:inline-block;
  text-decoration:none;
  position:relative;
  &:before{
    content:"";
    transition:all .2s ease-in;
    display:inline-block;
    border-radius:1em;
    width:110%;
    height:100%;
    position:absolute;
    left:-5%;
    z-index:-1;
  }
  &:hover{
    &:before{
      background:rgba(0,0,255,.2);
    }
  }
}
`;


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

  handleSubmit = async (event, authenticateEmailUser) => {
      event.preventDefault();
      await authenticateEmailUser().then( ({ data }) => {
          signIn(data.authenticateEmailUser.token);
            this.props.refetch();
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
          {( authenticateEmailUser, { data, loading, error }) => {
              return(
                <div>

                <form className="form" onSubmit={event => this.handleSubmit(event, authenticateEmailUser)} >
                    <input type="text" name="email" placeholder="email" value={email} onChange={this.handleChange} />
                    <input type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange} />
                    <button disabled={loading || this.validateForm()} type="submit" className="button-primary">Submit</button>
                    {error && <div>Error</div>}
                </form>
                <Link to={`/confirmReset`}><LinkStyle>Reset Password</LinkStyle></Link>
            </div>
              )
          }}
      </Mutation>
    </div>
  )
}
}
export default withRouter(Signin);