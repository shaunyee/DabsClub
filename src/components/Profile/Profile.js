import React from 'react';
import UserInfo from './UserInfo';
import withAuth from '../Auth/withAuth';


const Profile = ({ session }) => {
  return (
    <div className="App">
      <h1>{session.user.username}'s Profile</h1>
      <UserInfo session={session}/>
    </div>
  )
}
export default withAuth(session => session && session.user)(Profile)