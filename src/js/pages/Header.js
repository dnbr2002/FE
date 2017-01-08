import React from 'react';
import { Link } from 'react-router';
import { Navbar, NavItem, NavDropdown, DropdownButton, MenuItem } from 'react-bootstrap';
//require("react-bootstrap/lib/DropdownToggle")
//DropdownButton = ReactBootstrap.DropdownButton


import { LoginLink, LogoutLink, NotAuthenticated, Authenticated } from 'react-stormpath';

const dropdownItems = [
  { href: '/eventer', name: 'Fantasy Eventer' },
  { href: '/jumper', name: 'Fantasy Jumper' },
  { href: '/dressage', name: 'Fantasy Dressage' },
];

const headerDivStyle = {
  backgroundColor: "#e89543"
};

export default class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container warning">
          <div className="navbar-header">
            <button type="button" data-toggle="collapse" data-target="#navbar-collapse" className="navbar-toggle collapsed">
              <span className="sr-only">Toggle Navigation</span>
              <span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span>
            </button>
          </div>
          <div id="navbar-collapse" className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <Authenticated>
                <li><Link to="/home" activeClassName="active">Home</Link></li>
              </Authenticated>
              <Authenticated>
                <li><Link to="/profile" activeClassName="active">Profile</Link></li>
              </Authenticated>
              <Authenticated>
                <NavDropdown title="Fantasy Sports" alt="Fantasy Sports" id="Fantasy Sports">
                  <MenuItem href="/eventerpage">Fantasy Eventer</MenuItem>
                  <MenuItem href="/jumperpage">Fantasy Jumper</MenuItem>
                  <MenuItem href="/dressagepage">Fantasy Dressage</MenuItem>
                </NavDropdown>
              </Authenticated>
              <Authenticated>
                <li><Link to="/myteamspage" activeClassName="active">MyTeams</Link></li>
              </Authenticated>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <NotAuthenticated>
                <li>
                  <LoginLink activeClassName="active" />
                </li>
              </NotAuthenticated>
              <Authenticated>
                <li>
                  <LogoutLink />
                </li>
              </Authenticated>
              <NotAuthenticated>
                <li>
                  <Link to="/register" activeClassName="active">Create Account</Link>
                </li>
              </NotAuthenticated>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}