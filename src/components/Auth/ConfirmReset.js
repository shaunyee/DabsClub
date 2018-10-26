import React, { Component } from 'react'
import { Subscription, Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { RESET_SUBSCRIPTION, REQUEST_RESET_TOKEN } from '../../queries';
const initialState = {
    email: ''
}

class ConfirmReset extends Component {
    state = {...initialState}

    handleSubmit = async (event, triggerPasswordReset) => {
        event.preventDefault();
        triggerPasswordReset().then(({ data }) => {
            console.log(data)
        })  
        this.clearState();
            alert('You will recieve an email shortly with your reset link')
            this.props.history.push('/');
    }
    
    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }
    clearState = () => {
    this.setState({...initialState})
    }
  render() {
      const { email } = this.state;
    return (
        <Subscription subscription={ RESET_SUBSCRIPTION }>
            {({ data }) => (
        <Mutation mutation={REQUEST_RESET_TOKEN} variables={{ email }}>
            {triggerPasswordReset => (
                <div className="App">
                <h2>Request a Password Reset</h2>
                    <form className="form" onSubmit={event => this.handleSubmit(event, triggerPasswordReset )}>
                        <input type="email" name="email" placeholder="Email" value={email} onChange={this.handleChange}/>
                        <button>Request A Reset</button>
                    </form>
                </div>
            )}
        </Mutation>
            )}
        </Subscription>
    )
  }
}
export default withRouter(ConfirmReset);