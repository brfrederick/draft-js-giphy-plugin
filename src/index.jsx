/* npm packages */
import decorateComponentWithProps from 'decorate-component-with-props';

/* Helpers */
import add from './helpers/addGif';
import remove from './helpers/removeGif';
import cleanupGifs from './helpers/cleanupGifs';
import blockRendererFn from './blockRendererFn';

/* Components */
import GifEntity from './components/GifEntity';
import GifContainer from './components/Container';

/* Styles */
// import defaultTheme from './styles';

export default function(config = {}) {
  const theme = config.theme; // || defaultTheme;

	const containerProps = {
		selectButtonContent: config.selectButtonContent || 'GIF',
		theme
	};

	const gifProps = {
		attachRemoveButton: config.attachRemoveButton !== false,
		theme
	};

	const blockRendererConfig = {
		...config,
		GifEntity: decorateComponentWithProps(GifEntity, gifProps)
	};

	return {
    add,
    remove,
    onChange: cleanupGifs,
    blockRendererFn: blockRendererFn(blockRendererConfig),
    GifContainer: decorateComponentWithProps(GifContainer, containerProps)
	};
};
