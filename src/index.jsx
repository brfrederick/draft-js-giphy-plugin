/* npm packages */
import decorateComponentWithProps from 'decorate-component-with-props';

/* Helpers */
import addGif from './helpers/addGif';
import removeGif from './helpers/removeGif';
import cleanupGifs from './helpers/cleanupGifs';

/* Components */
import GifEntity from './components/GifEntity';
import Container from './components/Container';

/* Styling */
import gifStyles from './gif.css';
import selectStyles from './select.css';
import selectGifStyles from './selectGif.css';

const defaultTheme = {
  gif: gifStyles.gif,
  gifImage: gifStyles.gifImage,
  gifRemoveButton: gifStyles.gifRemoveButton,

  select: selectStyles.select,
  selectPopover: selectStyles.selectPopover,
  selectClosedPopover: selectStyles.selectClosedPopover,
  selectBottomGradient: selectStyles.selectBottomGradient,
  selectButton: selectStyles.selectButton,
  selectPressedButton: selectStyles.selectPressedButton,
  selectGifList: selectStyles.selectGifList,

  selectGif: selectGifStyles.selectGif,
  selectGifImage: selectGifStyles.selectGifImage,
};

const giphyPlugin = (config = {}) => {
	const theme = config.theme || defaultTheme;

	const selectButtonContent = config.selectButtonContent || '☺';
	const containerProps = {
		selectButtonContent,
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
	    onChange: cleanupGifs,
	    add: addGif,
	    remove: removeGif,
	    Container: decorateComponentWithProps(Container, containerProps)
	};
};

export default giphyPlugin;