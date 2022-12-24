import React from "react";
import { nanoid } from 'nanoid';


export default function SingleQuestion1(props) {
    console.log(props);
    // const ansArr = props.answers.map(ans => {
    //     return {
    //         id: nanoid(),
    //         value: ans,
    //         isSelected: false
    //     }
    // })

    const ansArr = props.answers;

    const ansCompArr = ansArr.map((ansObj, ansIndex) => {
        // console.log(ansObj);
        return (
            <button
                key={nanoid()}
                className="ans-btn"
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