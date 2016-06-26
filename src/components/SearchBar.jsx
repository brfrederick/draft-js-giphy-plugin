import React, { Component } from 'react';

export default class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = { value: "" }
	}
	handleChange(event) {
	    this.setState({ value: event.target.value });
		this.props.onChange(this.state.value);
	}
	render() {
		return (
			<div>
				<input
					className=""
					value={ this.state.value }
					placeholder="Search GIPHY for gifs"
        			onChange={ this.handleChange.bind(this) }
        			type="text" />
			</div>
		);
	}
}
