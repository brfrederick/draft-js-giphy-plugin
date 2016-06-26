import remove from './removeGif';

export default ({ GifEntity : component }) =>
  (block, { getEditorState, setEditorState }) => {
    if (block.getType() === 'gif') {
      return {
        component,
        props: {
          onRemove: key =>
            setEditorState(remove(getEditorState(), key))
        }
      };
    }
  };
