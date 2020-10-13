import { EditorState, genKey, ContentBlock, AtomicBlockUtils, getDefaultKeyBinding, KeyBindingUtil } from 'draft-js';

/**
 * Add a give text with a style to an EditorState
 * @param eState EditorState of the edior
 * @param t Text to be added
 * @param s Style of the text to be added
 * @return New EditorState with the added text
 */
export function insertNewBlock(eState: EditorState, t: string, s: string): EditorState {

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

    // TODO solve type error
    // @ts-ignore
    return EditorState.push(eState, newContentState, 'insert-fragment');
}

/**
 * @return The parent element of the element, currently selected on the window
 * Source: https://stackoverflow.com/questions/7215479/get-parent-element-of-a-selected-text
 */
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

/**
 * Add an image to the EditorState
 * @param eState EditorState the image is to be added
 * @param imgB64 The image in base64 format
 * @return The EditorState with the image added
 */
export function insertImageUtil(eState: EditorState, imgB64: string): EditorState {

    const contentState = eState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
        'image',
        'IMMUTABLE',
        { src: imgB64 }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const editor1 = EditorState.set(eState, {
        currentContent: contentStateWithEntity
    });
    const editor2 = AtomicBlockUtils.insertAtomicBlock(editor1, entityKey, ' ');
    return insertNewBlock(editor2, '', 'unstyled');
}

/**
 * Map key strokes to certain styles of insertion or text styling
 * @param event Key stroke event
 * @return New style of the editor
 */
export function hotKey(event): string {
    if (KeyBindingUtil.hasCommandModifier(event)) {
        switch (event.keyCode) {
            case 49:
                return 'header-one';
            case 70:
                return 'full';
            case 50:
                return 'header-three';
            case 51:
                return 'unstyled';
            case 52:
                return 'unordered-list-item';
            case 53:
                return 'img';
            case 83:
                return 'save';
            case 66:
                return 'bold';
            case 73:
                return 'italic';
            case 85:
                return 'underline';
        }
    }
    // adds default pre-made draft.js hotkeys
    return getDefaultKeyBinding(event);
}