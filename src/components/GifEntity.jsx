import React, { Component } from 'react';
import { Entity } from 'draft-js';

export default class GifEntity extends Component {

	componentWillMount() {
		console.log('gif');
	}

	remove(event) {
		event.preventDefault();
		event.stopPropagation();

		this.props.blockProps.onRemove(this.props.block.getKey());
	}

	render() {
		const { block, theme = {} } = this.props;
		const removeButton = (
		    <span
				className={ theme.gifRemoveButton }
				onClick={ this.remove }
				role="button">
				✕
		    </span>
	    );
	    const data = Entity.get(block.getEntityAt(0)).getData();
	    console.log(data);

	    return (
			<figure
				contentEditable={ false }
				data-offset-key={ `${block.get('key')}-0-0` }
				className={ theme.gif }>
		        <img
		          className={ theme.gifImage }
		          src={ data.url }
		          role="presentation"
		          width={ data.width }
		          height={ data.height }/>
			{ this.props.attachRemoveButton ? removeButton : null }
		</figure>
	    );
	}
}
