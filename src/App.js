import React, { Component } from 'react';
import MyEditor from './components/myeditor';
import toMarkdown from 'to-markdown';
import './App.css';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            htmlContent: "",
            orgContent: ""
        };
    }

    handleSelect(format) {
        let title = this.state.title;
        switch (format) {
        case "html":
            this.handleDownload(title + '.html', this.state.htmlContent, 'text/html');
            break;
        case "markdown":
            let md = toMarkdown(this.state.htmlContent);
            this.handleDownload(title + '.md', md, 'text/plain');
            break;
        case "org-mode":
            this.handleDownload(title + '.org', this.state.orgContent, 'text/plain');
            break;
        default:
            break;
        }
    }

    UpdateContent(content) {
        this.setState(content);
        console.log(this.state);
    }

    handleDownload(filename, content, type) {
        var navigator = window.navigator;

        let blob =  new Blob([content], { "type" :  type });
        if (navigator.msSaveBlob) {
            navigator.msSaveBlob(blob, filename);
        } else {
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.target = '_blank';
            a.download = filename;
            a.click();
            url.revokeObjectURL();
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
