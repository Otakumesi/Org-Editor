import React, { Component } from 'react';
import MyEditor from './components/myeditor';
import './App.css';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            htmlContent: "",
            orgContent: ""
        };
    }

    handleSelect(format) {
        event.preventDefault();
        switch (format) {
        case "html":
            this.handleDownload('text.html', this.state.htmlContent, 'text/html');
            break;
        case "markdown":
            break;
        case "org-mode":
            break;
        default:
            break;
        }
    }

    UpdateContent(content) {
        this.setState(content);
    }

    handleDownload(filename, content, type) {
        var navigator = window.navigator;

        let blob =  new Blob([content], { "type" :  type });
        if (navigator.msSaveBlob) {
            navigator.msSaveBlob(blob, filename);
        } else {
            var url = window.URL.createObjectURL(blob);
            window.location.href = url;
        }
    }

    render() {
        const navBar = (
            <Navbar>
              <Navbar.Header>
                <Navbar.Brand>
                  <a href="#">Org-Editor</a>
                </Navbar.Brand>
              </Navbar.Header>
              <Nav activeKey={1} onSelect={this.handleSelect.bind(this)}>
                <NavItem eventKey={"html"} href="#">exportHTML</NavItem>
                <NavItem eventKey={"markdown"} href="#">exportMarkdown</NavItem>
                <NavItem eventKey={"org-mode"} href="#">exportOrgmode</NavItem>
              </Nav>
            </Navbar>
        );
        return (
            <div className="App">
              {navBar}
              <MyEditor
                UpdateContent={this.UpdateContent.bind(this)} />
            </div>
        );
    }
}

export default App;
