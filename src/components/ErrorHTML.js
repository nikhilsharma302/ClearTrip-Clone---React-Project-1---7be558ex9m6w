import React, { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from './NavBar';

function ErrorHTML() {
    const location = useLocation();
    return (
        <>
            <NavBar />
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/><br/>

            <pre>****Either user does not exist in our database, or<br/>
                user has provided wrong credentials, please try again****</pre>
        </>
    );
}

export default ErrorHTML;
