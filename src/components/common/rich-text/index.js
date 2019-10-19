import React, { Component } from "react";
import PropTypes from "prop-types";
import { EditorState, RichUtils, AtomicBlockUtils } from "draft-js";
import Editor from "draft-js-plugins-editor";
import createToolbarPlugin, { Separator } from "draft-js-static-toolbar-plugin";
import createLinkPlugin from "draft-js-anchor-plugin";
import createInlineToolbarPlugin from "draft-js-inline-toolbar-plugin";
import {
  BoldButton,
  ItalicButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton
} from "draft-js-buttons";

import addImage from "./entities/addImage";
import { mediaBlockRenderer } from "./entities/mediaBlockRender";

import "draft-js-inline-toolbar-plugin/lib/plugin.css";
import "draft-js-static-toolbar-plugin/lib/plugin.css";
import "draft-js-anchor-plugin/lib/plugin.css";
import "./styles.css";

const linkPlugin = createLinkPlugin();

const staticToolbarPlugin = createToolbarPlugin();
const inlineToolbarPlugin = createInlineToolbarPlugin();
const { Toolbar } = staticToolbarPlugin;
const { InlineToolbar } = inlineToolbarPlugin;

const myPlugins = [staticToolbarPlugin, inlineToolbarPlugin, linkPlugin];

class RichText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
  }

  onChange = editorState => {
    this.setState({ editorState });
  };

  onAddImage = e => {
    e.preventDefault();
    const editorState = this.state.editorState;
    const urlValue = window.prompt("Paste Image Link");
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "image",
      "IMMUTABLE",
      { src: urlValue }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      editorState,
      { currentContent: contentStateWithEntity },
      "create-entity"
    );
    this.setState(
      {
        editorState: AtomicBlockUtils.insertAtomicBlock(
          newEditorState,
          entityKey,
          " "
        )
      },
      () => {
        setTimeout(() => this.focusEditor(), 0);
      }
    );
  };

  focusEditor = () => {
    this.editor.focus();
  };

  render() {
    return (
      <div>
        <div className="editor" onClick={this.focusEditor}>
          <Editor
            // placeholder="Enter your greate idea..."
            blockRendererFn={mediaBlockRenderer}
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={myPlugins}
            ref={el => (this.editor = el)}
          />
          <div className="static-toolbar">
            <Toolbar>
              {externalProps => (
                <>
                  <BoldButton {...externalProps} />
                  <ItalicButton {...externalProps} />
                  <UnderlineButton {...externalProps} />
                  <CodeButton {...externalProps} />
                  <Separator {...externalProps} />
                  <HeadlineOneButton {...externalProps} />
                  <HeadlineTwoButton {...externalProps} />
                  <HeadlineThreeButton {...externalProps} />
                  <UnorderedListButton {...externalProps} />
                  <OrderedListButton {...externalProps} />
                  <BlockquoteButton {...externalProps} />
                  <linkPlugin.LinkButton {...externalProps} />
                  <button onClick={this.onAddImage}>img</button>
                </>
              )}
            </Toolbar>
          </div>
          <InlineToolbar>
            {externalProps => (
              <>
                <BoldButton {...externalProps} />
                <ItalicButton {...externalProps} />
                <UnderlineButton {...externalProps} />
                <linkPlugin.LinkButton {...externalProps} />
              </>
            )}
          </InlineToolbar>
        </div>
      </div>
    );
  }
}

RichText.propTypes = {
  initialText: PropTypes.string
};

RichText.defaultProps = {
  initialText: "..."
};

export default RichText;
