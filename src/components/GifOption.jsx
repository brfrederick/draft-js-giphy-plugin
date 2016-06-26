import React, { Component } from 'react';

export default class GifOption extends Component {
	onClick() {
		this.props.onClick(this.props.id);
    e.preventDefault();
	}

	render() {
		const { id, url, width, height, theme = {} } = this.props;
		return (
			<button
				className='plzno'
				onClick={ this.onClick }
				key={ id }
				type="button">
				<img
					className='selectGifImage plzno'
					src={ url }
					role="presentation"
					width={ width }
					height={ height }
				/>
			</button>
		);
	}
}
