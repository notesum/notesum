import React from 'react';
import SplitPane from "react-split-pane"

import Pdf from '../pdf/Pdf';

import TextEditor from '../editor/Editor';

export default function MainView() {

    return (
        <div>
            <SplitPane split="vertical" defaultSize={900} primary="second" >
                <Pdf />
                <TextEditor />
            </SplitPane>
        </div>

}