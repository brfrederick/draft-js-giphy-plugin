/* npm packages */
import decorateComponentWithProps from 'decorate-component-with-props';

/* Helpers */
import addGif from './helpers/addGif';
import removeGif from './helpers/removeGif';
import cleanupGifs from './helpers/cleanupGifs';
import blockRendererFn from './helpers/blockRendererFn';

/* Components */
import GifEntity from './components/GifEntity';
import GiphyContainer from './components/GiphyContainer';

/* Styles */
// import defaultTheme from './styles';

/* Constants */
const giphyDevelopmentKey = 'dc6zaTOxFJmzC';

export default function(config = {}) {
	const theme = config.theme; // || defaultTheme;
	const giphyApiKey = config.apiKey || giphyDevelopmentKey;

	if (giphyApiKey === giphyDevelopmentKey) {
		console.warn('WARNING: This plugin is using Giphy\'s publicly-provided development key. You should not use this in production, so please address this soon!')
	}

	const containerProps = {
		selectButtonContent: config.selectButtonContent || 'GIF',
		giphyApiKey,
		theme
	};

	const gifProps = {
		attachRemoveButton: config.attachRemoveButton !== false,
		gifs: [],
		theme
	};

	const blockRendererConfig = {
		...config,
		GifEntity: decorateComponentWithProps(GifEntity, gifProps)
	};

	return {
		pluginProps: {
			blockRendererFn: blockRendererFn(blockRendererConfig),
			onChange: cleanupGifs
		},
		add: addGif,
		remove: removeGif,
		GiphyContainer: decorateComponentWithProps(GiphyContainer, containerProps)
	};
};
