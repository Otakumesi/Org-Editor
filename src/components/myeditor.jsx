import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState} from 'draft-js';
import { Col } from 'react-bootstrap';
import * as org from 'org';

var orgParser = new org.Parser();

class MyEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            previewState: ""
        };

        this.onChange = (editorState) => {
            var content = editorState.getCurrentContent();
            var orgText = content.getPlainText();
            var html = this.org2html(orgText);
            var text = `${html.titleHTML}\n${html.contentHTML}`;

            this.props.UpdateContent({
                htmlContent: text,
                orgContent: orgText
            });

            this.setState({
                editorState: editorState,
                previewState: text
            });
        };
    }

    componentDidMount() {
        console.log(ReactDOM.findDOMNode(this.refs.editor));
    }

    org2html(text) {
        var orgDoc = orgParser.parse(text);
        var html = orgDoc.convert(org.ConverterHTML, {
            headerOffset: 1,
            exportFromLineNumber: false,
            supressSubScriptHandring: false,
            suppressAutoLink: false
        });
        return html;
    }

    render() {
        return (
            <div className="MyEditor">
              <Col xs={12} md={6} className="partition">
                <Editor
                  autoFocus
                  ref="editor"
                  editorState={this.state.editorState}
                  onChange={this.onChange.bind(this)} />
              </Col>
              <Col xs={12} md={6}>
                <div className="Preview" dangerouslySetInnerHTML={{__html: this.state.previewState}}></div>
              </Col>
            </div>
        );
    }
}

export default MyEditor;
