import React, { Component } from 'react';

import SearchBar from './SearchBar';
import GifList from './GifList';

export default class Container extends Component {
	constructor(props) {
		super(props);
		this.state = { gifs: [] }
	}

	onChange(text) {
		// search
	}

	render() {
		return (
			<div>
				<SearchBar onChange={ this.onChange } />
				<GifList gifs={ this.state.gifs } />
			</div>
		);
	}
}