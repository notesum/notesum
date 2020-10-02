import { EditorState, genKey, ContentBlock, AtomicBlockUtils } from 'draft-js';

// Add a new block to a given editor state with the text t and the style s
export function insertNewBlock(eState, t, s) {

    const selection = eState.getSelection();
    const contentState = eState.getCurrentContent();
    const currentBlock = contentState.getBlockForKey(selection.getEndKey());
    const blockMap = contentState.getBlockMap();

    // Split the blocks
    const blocksBefore = blockMap.toSeq().takeUntil((v) => { return v === currentBlock; });
    const blocksAfter = blockMap.toSeq().skipUntil((v) => { return v === currentBlock; }).rest();

    const key1 = genKey();
    const key2 = genKey();
    let newBlocks = null;

    if (s === 'unordered-list-item') {
        // @ts-ignore
        newBlocks = [[key1, new ContentBlock({ key: key1, type: s, text: t })],
        [currentBlock.getKey(), currentBlock]];
    } else {
        // @ts-ignore
        newBlocks = [[key1, new ContentBlock({ key: key1, type: s, text: t })],
        // @ts-ignore
        [key2, new ContentBlock({ key: key2, type: 'unstyled', text: '' })],
        [currentBlock.getKey(), currentBlock]];
    }

    // Insert the new block
    const newBlockMap = blocksBefore.concat(newBlocks, blocksAfter).toOrderedMap();
    const newContentState = contentState.merge({
        blockMap: newBlockMap,
        selectionBefore: selection,
        selectionAfter: selection,
    });

    return EditorState.push(eState, newContentState, 'insert-fragment');
}

// Return the parent element classname of the selected element on the page
// Source: https://stackoverflow.com/questions/7215479/get-parent-element-of-a-selected-text
export function getSelectionParentElement() {
    let parentEl = null;
    let sel = null;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            parentEl = sel.getRangeAt(0).commonAncestorContainer;
            if (parentEl.nodeType !== 1) {
                parentEl = parentEl.parentNode;
            }
        }
    } else if ((sel === document.getSelection()) && sel.type !== 'Control') {
        parentEl = sel.createRange().parentElement();
    }
    return parentEl.parentNode;
}

// Inserts a given base64 image to the selection state
export function insertImageUtil(eState, b64) {

    const contentState = eState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
        'image',
        'IMMUTABLE',
        { src: b64 }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const editor1 = EditorState.set(eState, {
        currentContent: contentStateWithEntity
    });
    const editor2 = AtomicBlockUtils.insertAtomicBlock(editor1, entityKey, ' ');
    return insertNewBlock(editor2, '', 'unstyled');
}