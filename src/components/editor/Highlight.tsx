import React, { useState } from 'react';
import TextSelector from 'text-selection-react';


const Highlight = ({ callback }) => {


    function func(event) {
        if (window.getSelection().toString().length) {
            const exactText = window.getSelection().toString();
            callback(exactText)
        }
    }

    document.addEventListener('mouseup', func);



    return (
        <></>
    );
};
export default Highlight;
