import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import editorStyles from './editorStyles.css';
import CustomEditor from './CustomEditor';

ReactDOM.render(
  <div style={{'margin-top': '8vh'}}>
    <h2 style={{'text-align':'center', 'margin-bottom': '64px'}}> Giphy Keyboard Plugin for Draft-js </h2>
    <div className="content">
      <CustomEditor />
    </div>
  </div>,
  document.getElementById('app')
);
