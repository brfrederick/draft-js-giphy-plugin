import decorateComponentWithProps from 'decorate-component-with-props';

import GifList from './components/GifList'
import GifEntity from './components/GifEntity';


const defaultTheme = {};

const giphyPlugin = (config = {}) => {
	const theme = config.theme || defaultTheme;
	const gifs = config.gifs;

	const selectButtonContent = config.selectButtonContent || '☺';
	const gifListProps = {
	selectButtonContent,
	stickers,
	theme
	};

	const attachRemoveButton = config.attachRemoveButton !== false;
	const gifProps = {
		attachRemoveButton,
		gifs,
		theme
	};

	const blockRendererConfig = {
		...config,
		GifEntity: decorateComponentWithProps(GifEntity, gifProps);
	}
	return {
	    blockRendererFn: blockRendererFn(blockRendererConfig),
	    //onChange: cleanupEmptyStickers,
	    //add: addGif,
	    //remove: removeGif,
	    GifList: decorateComponentWithProps(GifList, gifListProps)
	};
};

export default giphyPlugin;