import React, { Component } from 'react'

 class UserForm extends Component {
    submitForm = (e) => {
        e.preventDefault();
        this.props.onSubmit({
            email: this.email.value,
            password: this.password.value
        })
    }
  render() {
    return (
      <div>
      <form onSubmit={this.submitForm}>
        <input type="email" innerRef={input => (this.email = input)} placeholder="Email"/><br />
        <input type="password" innerRef={input => (this.password = input)} placeholder="Password"/><br />
        <button>Submit</button>
      </form>
      </div>
    )
  }
}
export default UserForm;
