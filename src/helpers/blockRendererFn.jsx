import remove from './removeGif';

export default ({ GifEntity : component }) =>
  (block, { getEditorState, setEditorState }) => {
    console.log(block);
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
