import React from 'react';
import SplitPane from 'react-split-pane';

import Pdf from '../pdf/Pdf';
import TextEditor from '../editor/Editor';

export default function MainView() {
    // I put a scroll here for now but the pdf component should handle this better
    return (
        <div>
            <SplitPane split="vertical" minSize="50%" defaultSize="50%" style={{ overflowY: 'scroll' }}>
                <Pdf />
                <TextEditor />
            </SplitPane>
        </div>
    );

}