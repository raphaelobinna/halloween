import React from 'react';
import { connect } from 'react-redux';
import {Navbar, Nav} from 'react-bootstrap'

import { logout } from '../store/actions';

const NavBar = ({ auth, logout }) => (
    <Navbar bg="dark" variant="dark" >
        <Nav className="mr-auto">
      <Navbar.Brand className="navbar-brand" href="/">Poll app</Navbar.Brand>

      {!auth.isAuthenticated && (
         <Nav className="mr-auto">
              <Nav.Link className="navbar-item" href="/register">Register</Nav.Link>
    
              <Nav.Link className="navbar-item" href="/login"> Login</Nav.Link>
            </Nav>   
          
        )}
         {auth.isAuthenticated && (
           <Nav className="mr-auto">
              <Nav.Link className="navbar-item" href="/poll/new">New Poll</Nav.Link>
              <Nav.Link className="navbar-item" onClick={logout}>
                Logout
              </Nav.Link>
              <Nav.Link className="navbar-item" href="/admin">Admin</Nav.Link>
             
            </Nav>
        )}
            
         
        </Nav>


  
      {auth.isAuthenticated && (
        <p className="navbar-user">Logged in as {auth.user.username}</p>
      )}
   
  </Navbar>
);

export default connect(
  store => ({
    auth: store.auth,
  }),
  { logout },
)(NavBar);
