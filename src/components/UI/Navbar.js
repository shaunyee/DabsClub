import React from 'react';
import { NavLink } from 'react-router-dom';


const Navbar = () => (    
      <nav>
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
      </nav>
    );
export default Navbar;