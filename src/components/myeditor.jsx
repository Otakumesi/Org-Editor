import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState} from 'draft-js';
import { Row, Col } from 'react-bootstrap';
import * as org from 'org';

var orgParser = new org.Parser();

class MyEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            editorState: EditorState.createEmpty(),
            previewState: ""
        };

        this.onChange = (editorState) => {
            var content = editorState.getCurrentContent();
            var orgText = content.getPlainText();
            var html = this.org2html(orgText);
            var title = html.title;
            var text = `${html.titleHTML}<hr />${html.contentHTML}`;

            this.props.UpdateContent({
                title: title,
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
        this.refs.editor.focus();
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
            <div className="MyEditor container">
              <Row>
                <Col md={6} className="no-float">
                  <Editor
                    autoFocus
                    ref="editor"
                    editorState={this.state.editorState}
                    onChange={this.onChange.bind(this)} />
                </Col>
                <Col md={6} className="no-float">
                  <div className="Preview"
                       dangerouslySetInnerHTML={{__html: this.state.previewState}}></div>
                </Col>
              </Row>
            </div>
        );
    }
}

export default MyEditor;
