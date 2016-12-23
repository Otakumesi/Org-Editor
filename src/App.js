import React, { Component } from 'react';
import MyEditor from './components/myeditor';
import './App.css';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const navBar = (
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Org-Editor</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} href="#">exportHTML</NavItem>
            <NavItem eventKey={1} href="#">exportMarkdown</NavItem>
            <NavItem eventKey={1} href="#">exportOrgmode</NavItem>
          </Nav>
        </Navbar>
);

class App extends Component {
    render() {
        return (
            <div className="App">
              {navBar}
              <MyEditor />
            </div>
        );
    }
}

export default App;
