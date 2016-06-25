
import { BlockMapBuilder, CharacterMetadata, ContentBlock, EditorState, Entity, genKey, Modifier } from 'draft-js';

export default (editorState: Object, id: any) => {
    const currentContentState = editorState.getCurrentContent();
    const currentSelectionState = editorState.getSelection();

    const afterRemovalContentState = Modifier.removeRange(
        currentContentState,
        currentSelectionState,
        'backward'
    );

    const targetSelection = afterRemovalContentState.getSelectionAfter();
    const blockKeyForTarget = targetSelection.get('focusKey');
    const block = currentContentState.getBlockForKey(blockKeyForTarget);
    let insertionTargetSelection;
    let insertionTargetBlock;

    const isEmptyBlock = block.getLength() === 0 && block.getEntityAt(0) === null;
    const selectedFromStart = currentSelectionState.getStartOffset() === 0;
    if (isEmptyBlock || selectedFromStart) {
        insertionTargetSelection = targetSelection;
        insertionTargetBlock = afterRemovalContentState;
    } else {
        insertionTargetBlock = Modifier.splitBlock(afterRemovalContentState, targetSelection);
        insertionTargetSelection = insertionTargetBlock.getSelectionAfter();
    }

    const newContentStateAfterSplit = Modifier.setBlockType(insertionTargetBlock, insertionTargetSelection, 'gif');

    const entityKey = Entity.create('gif', 'IMMUTABLE', { id: id });
    const charDataOfGif = CharacterMetadata.create({ entity: entityKey });

    const fragmentArray = [
        new ContentBlock({
            key: genKey(),
            type: 'gif',
            text: '',
            //characterList: List(Repeat(charDataOfGif, 1))
        }),

        new ContentBlock({
            key: genKey(),
            type: 'unstyled',
            text: '',
            //characterList: List()
        }),
    ];

    const fragment = BlockMapBuilder.createFromArray(fragmentArray);

    const contentStateWithGif = Modifier.replaceWithFragment(
        newContentStateAfterSplit,
        insertionTargetSelection,
        fragment
    );

    const newState = EditorState.push(
        editorState,
        contentStateWithGif,
        'insert-gif'
    );
    return EditorState.forceSelection(newState, contentStateWithGif.getSelectionAfter());
};
