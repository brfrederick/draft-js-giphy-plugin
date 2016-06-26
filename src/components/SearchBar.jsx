import React, { Component } from 'react';

const styles = {
  width: '208px',
  height: '20px',
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: '10px',
}
export default class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = { value: "" }
	}
	handleChange(event) {
	    this.setState({ value: event.target.value });
		this.props.onChange(event.target.value);
	}

	render() {
		return (
				<input
					className="plzno"
          style={ styles }
          onClick={this.justDont}
					value={ this.state.value }
					placeholder="Search GIPHY for gifs"
        			onChange={ this.handleChange.bind(this) }
        			type="text" />
		);
	}
}
