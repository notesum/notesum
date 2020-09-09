import React from 'react';
import TextSelector from 'text-selection-react';


const Highlight = ({ callback }) => {

    return (
        <TextSelector
            events={[
                {
                    text: 'Add',
                    handler: (html, text) => callback(text)
                }
            ]}
            color={'yellow'}
            colorText={false}
        />
    );
};
export default Highlight;
