import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { RESET_PASSWORD } from '../../queries';
import Error from '../../Utilities/Error';



 class ResetPassword extends Component {
     state = {
         password: '',
         confirmPassword: ''
     }

     handleSubmit = (event, resetPassword) => {
        event.preventDefault();
        resetPassword().then(({ data}) => {
        })
        alert('Password has been reset. Please sign back in')
        this.props.history.push('/')
     }

     handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
     }
  render() {
      const { match } = this.props;
      const { password, confirmPassword } = this.state;
    return (
        <Mutation mutation={RESET_PASSWORD} variables={{resetToken: match.params.id, password }}>
            {(resetPassword, {error}) => {
                if(error) return <Error error={error} />
                return(
                    <div className="App">
                    <h3>Reset Your Password</h3>
                    <form className="form" onSubmit={event => this.handleSubmit(event, resetPassword)}>
                        <input type="password" placeholder="Password" name="password" value={password} onChange={this.handleChange}/>
                        <input type="password" placeholder="Confirm Password" name="confirmPassword" value={confirmPassword} onChange={this.handleChange}/>
                        <button>Reset</button>
                    </form>
                    </div>
                )
            }}
        </Mutation>
    )
  }
}
export default withRouter(ResetPassword);