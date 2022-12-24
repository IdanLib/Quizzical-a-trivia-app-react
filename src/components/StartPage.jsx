import React from "react";
import Form from "./Form";

export default function StartPage(props) {

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        props.setPrefs(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.setIsStart(true);
    }

    return (
        <div className="start-page with-blobs">
            <h1 className="title">Quizzical: A Trivia App</h1>
            <p className="desc">Let's Get Quizzical!</p>
            <Form
                onChange={handleFormChange}
                onSubmit={handleSubmit}
                prefs={props.prefs}
            />
        </div>

    )
}
