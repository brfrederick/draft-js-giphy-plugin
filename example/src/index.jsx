import React from 'react';
import ReactDOM from 'react-dom';

const App = React.createClass({
  render: function() {
    return (
      <h1> hello </h1>
    );
  }
});

ReactDOM.render(
  <App />,
  document.body
);
