import React, { useState, useEffect } from 'react';
import './Hotels.css'
export default function IndiCardImg({ data }) {
    const [arr, setArr] = useState([]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const encodedUrls = urlParams.get('images');

        if (encodedUrls) {
            try {
                const decodedUrls = JSON.parse(decodeURIComponent(encodedUrls));
                setArr(decodedUrls);
            } catch (error) {
                console.error("Error parsing image URLs:", error);
            }
        }

        return () => {
            document.body.innerHTML = ""; // Clearing the body of the document
        };
    }, []);

    return (
        <div className="cardimgs">
            {
                arr.length > 0 ?
                    arr.map(imgUrl => (
                        <div key={imgUrl}>
                            <img src={imgUrl} alt="image is loading"  className="imgcard"/>
                        </div>
                    )) :
                    <div>Nothing to Display, kindly visit the Hotels page</div>
            }
        </div>
    );
}
