import React, { useState } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { logout, getLoggedUser } from '../../../core/api/users.api';

const logoutStyle = {
    cursor:'pointer'
}

export const Header = withRouter((props)=>{

  const loggeduser = getLoggedUser();

  const [isLoggedOut,setLogoutFlag] = useState(false);
  const [searchParam,setSearchParam] = useState('');
  const onLogout = (event)=>{
    logout();
    setLogoutFlag(true);
  }

  const onSearchChange = (event)=>{
    event.persist();
    setSearchParam(event.target.value);
  }

  const onSearchClik = (event) =>{
    event.preventDefault();
    const pathNameUrl = props.location.pathname.substr(1);
    
    const historiObj = {pathname:`/${pathNameUrl}`};
    if(searchParam){
      historiObj['search'] = `?q=${searchParam}`;
    }
    props.history.push(historiObj);
  }

    return(
        <>
        {isLoggedOut && <Redirect to="/login"/>}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="/">Navbar</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link className="nav-link" to="/">Home</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/users">Users</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/users/create">Create user</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/notes">All notes</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/notes/my-notes">My notes</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/notes/create">Create note</Link>
      </li>
    </ul>
    <form className="form-inline my-2 my-lg-0" onSubmit={onSearchClik}>
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={onSearchChange}/>
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
    <span className="logout-btn " style={logoutStyle} onClick={onLogout}>{loggeduser.name} Logout</span>
  </div>
</nav>
      </>
    );
})