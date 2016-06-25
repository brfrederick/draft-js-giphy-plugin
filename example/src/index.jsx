import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import editorStyles from './editorStyles.css';
import CustomEditor from './CustomEditor';

ReactDOM.render(
  <div>
    <h2> Giphy Keyboard Plugin for Draft-js </h2>
    <CustomEditor />
  </div>,
  document.getElementById('app')
);
