import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Signout from '../Auth/Signout';


const Navbar = ({ session }) => (    
      <nav>
        {session && session.user ? <NavbarAuth session={session} /> : <NavbarUnAuth />}
      </nav>
    );

const NavbarUnAuth = () => (
    <ul>
        <li>
            <NavLink to="/" exact>Home</NavLink> 
        </li>
        <li>
        <NavLink to="/signin">Signin</NavLink> 
        </li>
        <li>
        <NavLink to="/signup">SignUp</NavLink> 
        </li>
    </ul>
);

const NavbarAuth = ({ session }) => (
    <Fragment>
        <ul>
            <li>
                <NavLink to="/" exact>Home</NavLink>
            </li>
            <li>
                <NavLink to={`/profile/${session.user.id}`}>Profile</NavLink>
            </li>
            {session.user.role === 'ADMIN' && <li><NavLink to="/createGame">Add Games</NavLink></li>}
            <li>
                <Signout />
            </li>
        </ul>
        <h4>Welcome, <strong>{session.user.username}</strong></h4>
    </Fragment>
);

export default Navbar;