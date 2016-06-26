import React, { Component } from 'react';

export default class GifOption extends Component {
	onClick() {
		this.props.onClick(this.props.id);
	}

	render() {
		const { id, url, width, height, theme = {} } = this.props;
		return (
			<button
				className={ theme.selectGif }
				onClick={ this.onClick }
				key={ id }
				type="button">
				<img
					className={ theme.selectGifImage }
					src={ url }
					role="presentation"
					width={ width }
					height={ height }
				/>
			</button>
		);
	}
}