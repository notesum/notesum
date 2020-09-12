import React, { useState } from 'react';
import TextSelector from 'text-selection-react';


const Highlight = ({ callback }) => {
    const useNew = true;

    React.useEffect(() => {
        if (useNew) {
            document.addEventListener('mouseup', func);
        }
    }, []);



    function func(event) {
        if (window.getSelection().toString().length) {
            const exactText = window.getSelection().toString();
            console.log(exactText);
            callback(exactText);
        }
    }

    if (!useNew) {
        return (
            <TextSelector
                events={[
                    {
                        text: 'Add',
                        handler: (html, text) => callback(text.toString())
                    }
                ]}
                color={'yellow'}
                colorText={false}
            />
        );
    } else {
        return(<></>);
    }
};
export default Highlight;
