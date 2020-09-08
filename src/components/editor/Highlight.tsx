import React from "react";
import TextSelector from 'text-selection-react';


const Highlight = ({ call }) => {

    return (

        <TextSelector
            events={[
                {
                    text: 'Add',
                    handler: (html, text) => call(text)
                }
            ]}
            color={'yellow'}
            colorText={false}
        />



    )
};

export default Highlight;
