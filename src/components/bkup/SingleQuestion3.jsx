import React from "react";
import { nanoid } from 'nanoid';


export default function SingleQuestion3(props) {

    let ansCompArr = [];
    let ansStyle = undefined;

    const styleAns = (ansObj => {
        const selectedStyle = { backgroundColor: "#D6DBF5" };
        const unSelectedStyle = { backgroundColor: "#F5F7FB" };
        const selectedCorrectlyStyle = {
            backgroundColor: "#94D7A2",
            border: "none"
        };

        const selectedIncorrectlyStyle = {
            backgroundColor: "#F8BCBC",
            border: "none",
            opacity: 0.5
        };

        if (!props.isCheckAnswers) {
            ansStyle = ansObj.isSelected
                ? selectedStyle
                : unSelectedStyle
        } else {
            if (ansObj.isCorrect) {
                if (ansObj.isSelected) {
                    ansStyle = selectedCorrectlyStyle;
                } else {
                    ansStyle = { ...selectedCorrectlyStyle, opacity: 0.3 }
                }
            } else {
                if (ansObj.isSelected) {
                    ansStyle = selectedIncorrectlyStyle
                } else {
                    ansStyle = { ...unSelectedStyle, opacity: 0.5 };
                }
            }
        }

        return ansStyle;
    })


    ansCompArr = props.answers.map((ansObj, ansIndex) => {
        return (
            <button
                key={nanoid()}
                className="ans-btn"
                style={styleAns(ansObj)}
                onClick={(event) => props.whenSelected(event, props.id, ansIndex)}
            >{ansObj.value}
            </button>
        )
    })

    return (
        <div className="single-question-component">
            <h3 className="question-text">{props.questionText}</h3>
            <div className="ans-arr">{ansCompArr}</div>

        </div>
    )
}