import React, { useState } from 'react';
import TextSelector from 'text-selection-react'



export default function Editor() {


    const [text, setText] = useState([])

    function high(t) {
        setText(text.concat(t))

    }


    return (
        <>
            <TextSelector
                events={[
                    {
                        text: 'Submit',
                        handler: (html, text) => { high(text) }
                    }
                ]}
                color={'yellow'}
                colorText={false}
            />

            <div>

                {text.map((item) => (
                    <h6>{item}</h6>

                ))}


            </div>
    
        </>
    )
}