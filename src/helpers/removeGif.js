import { EditorState, Modifier, SelectionState } from 'draft-js';

export default (editorState: Object, blockKey: String) => {
	let content = editorState.getCurrentContent();
	const newSelection = new SelectionState({
		anchorKey: blockKey,
		anchorOffset: 0,
		focusKey: blockKey,
		focusOffset: 0,
	});

	const afterKey = content.getKeyAfter(blockKey);
	const afterBlock = content.getBlockForKey(afterKey);
	let targetRange;

	if (afterBlock &&
		afterBlock.getType() === 'unstyled' &&
		afterBlock.getLength() === 0 &&
		afterBlock === content.getBlockMap().last()) {
		targetRange = new SelectionState({
			anchorKey: blockKey,
			anchorOffset: 0,
			focusKey: afterKey,
			focusOffset: 0,
		});
	} else {
		targetRange = new SelectionState({
			anchorKey: blockKey,
			anchorOffset: 0,
			focusKey: blockKey,
			focusOffset: 1,
		});
	}

	content = Modifier.setBlockType(
		content,
		targetRange,
		'unstyled'
	);
	content = Modifier.removeRange(content, targetRange, 'backward');
	
	const newState = EditorState.push(editorState, content, 'remove-gif');
	return EditorState.forceSelection(newState, newSelection);
};