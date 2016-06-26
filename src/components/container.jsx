/* npm packages */
import React, { Component } from 'react';

/* Helpers */
import Giphy from '../helpers/giphy';

/* Components */
import SearchBar from './SearchBar';
import GifList from './GifList';

export default class Container extends Component {
	constructor(props) {
		super(props);
		const key = this.props.apiKey || this.props.giphyApiKey;
		if (key) {
			this.state = { gifs: [], giphy: new Giphy(key) };
		} else {
			this.state = { gifs: [] };
		}
	}

	componentWillMount() {
		giphy.trending().then(function (gifs) {
			this.setState({
				gifs: gifs
			})
		}, function (error) {
			
		});
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