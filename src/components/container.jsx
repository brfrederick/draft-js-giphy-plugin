/* npm packages */
import React, { Component } from 'react';

/* Helpers */
import Giphy from '../helpers/giphy';
import addGif from '../helpers/addGif';

/* Components */
import SearchBar from './SearchBar';
import GifList from './GifList';


export default class Container extends Component {
  state = {
    open: false,
    gifs: [],
    giphy: this.props.giphyApiKey ? new Giphy(this.props.giphyApiKey) : undefined
  }

	componentDidMount() {
		document.addEventListener('click', this.closePopover.bind(this));

    if (this.state.giphy) {
			this.state.giphy.trending().then(function (gifs) {
				this.setState({
					gifs: gifs
				})
			}, function (error) {

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
				open: true,
        gifs: this.state.gifs,
        giphy: this.state.giphy,
			});
		}
	}

	closePopover() {
		if (!this.preventNextClose && this.state.open) {
			this.setState({
				open: false,
        gifs: this.state.gifs,
        giphy: this.state.giphy,
			});
		}
		this.preventNextClose = false;
	}

	onChange(text) {
		// search
	}

  onGifClick(gif){
    const { editor } = this.props;
		editor.onChange(add(editor.state.editorState, id));
  }

	render() {
    const popoverClassName = this.state.open ? 'selectPopover' : 'selectClosedPopover';
    const buttonClassName = this.state.open ? 'selectPressedButton': 'selectButton';

		return (
      <div className={ 'select' } style={{display:'inline-block'}}>
        <button
          style={{marginRight: '10px', width:'40px', height:'40px'}}
          className={ buttonClassName }
          onMouseUp={ this.openPopover.bind(this) }
          type="button">
          { this.props.selectButtonContent || 'GIF' }
        </button>

        <div className={ popoverClassName }>
  				<SearchBar
            onChange={ this.onChange }
          />
  				<GifList
            gifs={ this.state.gifs }
            add={ this.onGifClick }
            theme={ this.props.theme }
          />
        </div>
        <div className={ 'selectBottomGradient' }></div>
      </div>
		);
	}
}
