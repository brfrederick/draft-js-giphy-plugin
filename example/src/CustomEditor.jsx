import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createMentionPlugin from 'draft-js-mention-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createStickerPlugin from 'draft-js-sticker-plugin';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createUndoPlugin from 'draft-js-undo-plugin';
import createGiphyPlugin from '../../src';


import  'draft-js-linkify-plugin/lib/plugin.css';
import  'draft-js-mention-plugin/lib/plugin.css';
import  'draft-js-sticker-plugin/lib/plugin.css';
import  'draft-js-hashtag-plugin/lib/plugin.css';
import  'draft-js-undo-plugin/lib/plugin.css';
import  './editorStyles.css';

import { fromJS } from 'immutable';
const mentions = fromJS([
  {
    name: 'Matthew Russell',
    link: 'https://twitter.com/mrussell247',
    avatar: 'https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg',
  },
  {
    name: 'Julian Krispel-Samsel',
    link: 'https://twitter.com/juliandoesstuff',
    avatar: 'https://pbs.twimg.com/profile_images/477132877763579904/m5bFc8LF_400x400.jpg',
  },
  {
    name: 'Jyoti Puri',
    link: 'https://twitter.com/jyopur',
    avatar: 'https://pbs.twimg.com/profile_images/705714058939359233/IaJoIa78_400x400.jpg',
  },
  {
    name: 'Max Stoiber',
    link: 'https://twitter.com/mxstbr',
    avatar: 'https://pbs.twimg.com/profile_images/681114454029942784/PwhopfmU_400x400.jpg',
  },
  {
    name: 'Nik Graf',
    link: 'https://twitter.com/nikgraf',
    avatar: 'https://pbs.twimg.com/profile_images/535634005769457664/Ppl32NaN_400x400.jpeg',
  },
]);

const stickers = fromJS({
  data: {
    'b3aa388f-b9f4-45b0-bba5-d92cf2caa48b': {
      id: 'b3aa388f-b9f4-45b0-bba5-d92cf2caa48b',
      url: 'https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-1/p50x50/13528954_10209637172357078_1152317161469042009_n.jpg?oh=8517c1b4da303046e6c60bb50bc017a4&oe=57F47A9F',
    },
    'adec3f13-823c-47c3-b4d1-be4f68dd9d6d': {
      id: 'adec3f13-823c-47c3-b4d1-be4f68dd9d6d',
      url: 'https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-1/p50x50/13240479_10209459882798985_476225401452732142_n.jpg?oh=931fadcd3a1b54ec59bbed5cd0ad80e5&oe=57F79A17',
    },
    'e14b5a20-1025-4952-b731-41cd4b118ba0': {
      id: 'e14b5a20-1025-4952-b731-41cd4b118ba0',
      url: 'https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-1/p50x50/12688233_10204622552838881_2874193054376146452_n.jpg?oh=3ad9f066ece54fde71858b1bff374951&oe=5800CCBE',
    },
    '659a0dbf-5f85-4f32-999d-eb9ba6b0f417': {
      id: '659a0dbf-5f85-4f32-999d-eb9ba6b0f417',
      url: 'https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-1/p50x50/13226929_1296044280425045_6841083872959278945_n.jpg?oh=1dbe27a8a26a263364db506894d37a0f&oe=580302FA',
    },
  },
});

const text = `Type here...`;

const mentionPlugin = createMentionPlugin({ mentions });
const linkifyPlugin = createLinkifyPlugin();
const stickerPlugin = createStickerPlugin({ stickers });
const StickerSelect = stickerPlugin.StickerSelect;
const hashtagPlugin = createHashtagPlugin();
const undoPlugin = createUndoPlugin();
const giphyPlugin = createGiphyPlugin();
const Container = giphyPlugin.Container;
const { UndoButton, RedoButton } = undoPlugin;

const plugins = [mentionPlugin, linkifyPlugin, stickerPlugin, giphyPlugin, hashtagPlugin, undoPlugin];

export default class CustomEditor extends Component {

  state = {
    editorState: createEditorStateWithText(text),
  };

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  focus = () => {
    this.refs.editor.focus();
  };

  render() {
    return (
      <div>
        <div className="editor" onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            ref="editor"
          />
        </div>
        <div className="option">
          <Container editor={ this } />
          <StickerSelect editor={ this }  />
          <span style={{marginRight:'10px'}} />
          <UndoButton
            editorState={ this.state.editorState }
            onChange={ this.onChange }
          />
          <RedoButton
            editorState={ this.state.editorState }
            onChange={ this.onChange }
          />
        </div>
      </div>
    );
  }
}
