import React from 'react';
import UserInfo from './UserInfo';
import withAuth from '../Auth/withAuth';


const Profile = ({ session }) => {
  return (
    <div className="App">
      <UserInfo session={session}/>
    </div>
  )
}
export default withAuth(session => session && session.user)(Profile)