import { EditorState, Modifier, SelectionState } from 'draft-js';

const cleanupGif = (editorState: Object, blockKey: String) => {
	const content = editorState.getCurrentContent();

	const targetRange = new SelectionState({
		anchorKey: blockKey,
		anchorOffset: 0,
		focusKey: blockKey,
		focusOffset: 0,
	});

	const withoutGif = Modifier.setBlockType(
		content,
		targetRange,
		'unstyled'
	);
	const newState = EditorState.push(editorState, withoutGif, 'remove-gif');
	return EditorState.forceSelection(newState, withoutGif.getSelectionAfter());
};

export default (editorState: Object): Object => {
	let newEditorState = editorState;

	editorState.getCurrentContent().get('blockMap').forEach((block) => {
		if (block.get('type') === 'gif' && block.getEntityAt(0) === null) {
			newEditorState = cleanupGif(editorState, block.get('key'));
		}
	});
	return newEditorState;
};