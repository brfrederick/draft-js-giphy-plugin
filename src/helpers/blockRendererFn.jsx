import remove from './removeGif';

export default (config) =>
  (block, { getEditorState, setEditorState }) => {
    if (block.getType() === 'GIF') {
      console.log(block);
      return {
        component: config.GifEntity,
        props: {
          onRemove: key =>
            setEditorState(remove(getEditorState(), key))
        }
      };
    }
  };
