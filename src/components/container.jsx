/* npm packages */
import React, { Component } from 'react';

/* Helpers */
import Giphy from '../helpers/giphy';

/* Components */
import SearchBar from './SearchBar';
import GifList from './GifList';

export default class Container extends Component {
  state = {
    gifs: [],
    giphy: this.props.giphyApiKey ? new Giphy(this.props.giphyApiKey) : undefined
  }

	componentWillMount() {
		if (this.state.giphy) {
			this.state.giphy.trending().then(function (gifs) {
				this.setState({
					gifs: gifs
				})
			}, function (error) {

			});
		}
	}

	onChange(text) {
		// search
	}

  onGifClick(gif){
    // add gif?
  }

	render() {
		return (
			<div>
				<SearchBar
          onChange={ this.onChange }
          theme={ this.props.theme }
        />
				<GifList
          gifs={ this.state.gifs }
          onGifClick={ this.onGifClick }
          theme={ this.props.theme }
        />
			</div>
		);
	}
}
