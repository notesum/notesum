import React, { useState } from 'react';
import logo from '../../resources/logo.svg';


export default function Editor() {


    const [text, setText] = useState(null)


    return (
        <>
        <img src={logo} className="App-logo" alt="logo" />
        </>
    )

}