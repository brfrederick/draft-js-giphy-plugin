import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Editor from 'draft-js-plugins-editor';
import editorStyles from './editorStyles.css';
import { EditorState } from 'draft-js';
import createStickerPlugin from 'draft-js-sticker-plugin';
import 'draft-js-sticker-plugin/lib/plugin.css';
import { fromJS } from 'immutable';

const stickers = fromJS({
  data: {
    'b3aa388f-b9f4-45b0-bba5-d92cf2caa48b': {
      id: 'b3aa388f-b9f4-45b0-bba5-d92cf2caa48b',
      url: 'https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-1/p50x50/12688233_10204622552838881_2874193054376146452_n.jpg?oh=3ad9f066ece54fde71858b1bff374951&oe=5800CCBE',
    },
    'adec3f13-823c-47c3-b4d1-be4f68dd9d6d': {
      id: 'adec3f13-823c-47c3-b4d1-be4f68dd9d6d',
      url: 'https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-1/p50x50/12688233_10204622552838881_2874193054376146452_n.jpg?oh=3ad9f066ece54fde71858b1bff374951&oe=5800CCBE',
    },
  },
});

const stickerPlugin = createStickerPlugin({ stickers });
const StickerSelect = stickerPlugin.StickerSelect;
const plugins = [];

class TestEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = editorState => this.setState({ editorState });
  }
  render() {
    return (
      <div>
        <div className={ editorStyles.editor } onClick={ this.focus } >
          <Editor
            editorState= { this.state.editorState }
            onChange= { this.onChange }
            plugins= { plugins }
            placeholder= "placeholder stuff"
          />
        </div>
        <div className={ editorStyles.options } >
          <StickerSelect editor= { this } />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <div>
    <h2> Giphy Keyboard Plugin for Draft-js </h2>
    <TestEditor />
  </div>,
  document.getElementById('app')
);
