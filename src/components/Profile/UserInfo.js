import React from 'react';

const UserInfo = ({ session }) => {
  console.log(session);
  return (
    <div className="App">
      <p><strong>Email:</strong> {session.user.email}</p>
    </div>
  )
}
export default UserInfo;