/* Components */
import React, { Component } from 'react';
import GifOption from './GifOption';

function setOverflow(newValue, element) {
	element.style.overflow = newValue;
}

export default class GifList extends Component {

  onMouseEnter() {
		setOverflow('hidden', document.body);
	}

	onMouseLeave() {
		setOverflow('auto', document.body);
	}

	render() {
		const gifOptions = this.props.gifs.map((gif) => {
			const id = gif.id,
				  url = gif.url,
				  width = gif.width,
				  height = gif.height;
			return (
				<GifOption
					theme={ this.props.theme }
					key={ id }
					onClick={ this.props.add }
					id={ id }
					url={ url }
					width={ width }
					height={ height } />
				);
		});

		return (
			<div
				onMouseEnter={ this.onMouseEnter.bind(this) }
				onMouseLeave={ this.onMouseLeave.bind(this) }>
				<div className="selectGifList">
					{ gifOptions }
				</div>
			</div>
		);
	}
}
