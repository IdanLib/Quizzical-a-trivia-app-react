import React from "react";

export default function StartPage1(props) {

    const handleClick = () => props.setIsStart(true);

    return (
        <>
            <div className="start-page with-blobs">
                <h1 className="title">Quizzical</h1>
                <p className="desc">Do you anything at all?</p>
                <button
                    className="start-game"
                    onClick={handleClick}
                >
                    Let's Play!
                </button>
            </div>
        </>
    )
}
