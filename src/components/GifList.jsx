/* Helpers */
import addGif from '../helpers/addGif';

/* Components */
import React, { Component } from 'react';
import GifOption from './GifOption';

function setOverflow(newValue, element) {
	element.style.overflow = newValue;
}

export default class GifList extends Component {
	constructor(props) {
    	super(props);
    	this.state = {
    		open: false
    	};
	}

	componentDidMount() {
		document.addEventListener('click', this.closePopover);
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.closePopover);
	}

	onMouseEnter() {
		setOverflow('hidden', document.body);
	}

	onMouseLeave() {
		setOverflow('auto', document.body);
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

	add(id) {
		const { editor } = this.props;
		editor.onChange(add(editor.state.editorState, id));
	}

	render() {
		const gifOptions = this.props.gifs.map((gif) => {
			const id = gif.id;
			const url = gif.url;
			return (
				<GifOption
					theme={ this.props.theme }
					key={ id }
					onClick={ this.add }
					id={ id }
					url={ url } />
				);
		});
		const { theme = {} } = this.props;
		const popoverClassName = this.state.open ? theme.selectPopover : theme.selectClosedPopover;
		const buttonClassName = this.state.open ? theme.selectPressedButton : theme.selectButton;

		return (
			<div className={ theme.select }>
				<button
					className={ buttonClassName }
					onMouseUp={ this.openPopover }
					type="button">
					{ this.props.selectButtonContent }
				</button>
				<div
					className={ popoverClassName }
					onMouseEnter={ this.onMouseEnter }
					onMouseLeave={ this.onMouseLeave }>
					<div className={ theme.selectGifList }>
						{ gifOptions }
					</div>
					<div className={ theme.selectBottomGradient }></div>
				</div>
			</div>
		);
	}
}