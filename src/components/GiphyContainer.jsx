/* npm packages */
import React, { Component } from 'react';

/* Helpers */
import Giphy from '../helpers/giphy';

/* Components */
import SearchBar from './SearchBar';
import GifList from './GifList';

export default class GiphyContainer extends Component {
	state = {
    	open: false,
		gifs: [],
		giphy: this.props.giphyApiKey ? new Giphy(this.props.giphyApiKey) : undefined
	}

	componentWillMount() {
		document.addEventListener('click', this.closePopover.bind(this));
		if (this.state.giphy) {
			var that = this;
			this.state.giphy.trending().then(function (gifs) {
				that.setState({
					gifs: gifs
				});
			}, function (error) {
				console.error(error);
			});
		}
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.closePopover.bind(this));
	}

	openPopover() {
		if(!this.state.open) {
			this.preventNextClose = true;
			this.setState({
				open: true
			});
		}
	}

	closePopover() {
		if (!this.preventNextClose && this.state.open) {
			this.setState({
				open: false
			});
		}
		this.preventNextClose = false;
	}

	onChange(text) {
		// search
		console.log(this.state.giphy);
		if (this.state.giphy) {
			var that = this;
			this.state.giphy.search(text).then(function (gifs) {
				if (text === gifs.searchTerm) {
					that.setState({
						gifs: gifs
					});
				}
			}, function (error) {
				console.error(error);
			})
		}
	}

	onGifClick(gif){
		// add gif?
    	const { editor } = this.props;
		editor.onChange(add(editor.state.editorState, id));
	}

	render() {
		return (
      		<div className={ 'select' } style={{display:'inline-block'}}>
        		<button
          			style={ { marginRight: '10px', width:'40px', height:'40px' } }
          			className={ buttonClassName }
          			onMouseUp={ this.openPopover.bind(this) }
          			type="button">
          			{ this.props.selectButtonContent || 'GIF' }
        		</button>

		        <div className={ popoverClassName }>
  					<SearchBar onChange={ this.onChange.bind(this) } />
  					<GifList
            			gifs={ this.state.gifs }
            			add={ this.onGifClick.bind(this) }
            			theme={ this.props.theme } />
        		</div>
        		<div className={ 'selectBottomGradient' }></div>
      		</div>
		);
	}
}
