import React,{useContext} from 'react';
import './Navlinks.css';
import { NavLink } from 'react-router-dom';
import {AuthContext} from '../context/auth-context'
function Navlinks(props){
    const auth= useContext(AuthContext);


    return(        
    <ul className="nav-links">
    <li>
        <NavLink to="/" >All Users</NavLink>
    </li>
    {auth.isLoggedIn && (
    <li>
        <NavLink to={`/${auth.userId}/places`}>My place</NavLink>
    </li>
    )} 
    {auth.isLoggedIn && (
    <li>
        <NavLink to="/place/new">ADD places</NavLink>
    </li>
    )}
    {!auth.isLoggedIn &&(
    <li>
        <NavLink to="/auth">Authetificate</NavLink>
    </li>
    )}
    {auth.isLoggedIn && (
        <li>
            <button onClick={auth.logout}>LOGOUT</button>

    </li>
    )}
</ul>


    );


}
export default Navlinks;