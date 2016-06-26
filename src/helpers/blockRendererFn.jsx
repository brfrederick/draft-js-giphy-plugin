import remove from './removeGif';

export default (config) =>
  (block, getEditorState, setEditorState) => {
    if (block.getType() === 'GIF') {
      return {
        component: config.GifEntity,
        props: {
          onRemove: key =>
            setEditorState(remove(getEditorState(), key))
        }
      };
    }
  };
