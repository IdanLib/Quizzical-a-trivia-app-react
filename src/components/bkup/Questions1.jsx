import React from "react";
import { nanoid } from 'nanoid';
import SingleQuestion from "./SingleQuestion";

export default function Questions1() {

    const [questions, setQuestions] = React.useState([]);
    const [isLoaded, setisLoaded] = React.useState();

    React.useEffect(() => {
        const getQuestionsArr = (resultsArr) => {
            return resultsArr.map(obj => {
                const encodedArr = [...obj.incorrect_answers, obj.correct_answer];
                const ansArr = encodedArr.map(ans => atob(ans));
                const shuffledAnsArr = ansArr.sort(() => 0.5 - Math.random());
                const answerObjArr = shuffledAnsArr.map(textAns => {
                    return {
                        id: nanoid(),
                        value: textAns,
                        isSelected: false
                    }
                })

                const objId = nanoid();
                return {
                    key: objId,
                    id: objId,
                    questionText: atob(obj.question),
                    correct: atob(obj.correct_answer),
                    answers: answerObjArr,
                    isSelectedCorrectly: false
                }
            })
        }

        async function getRawQuestions() {
            const res = await fetch("https://opentdb.com/api.php?amount=5&category=9&encode=base64");
            const data = await res.json();
            const questionObjArr = await getQuestionsArr(data.results);
            setQuestions(questionObjArr);
            setisLoaded(true);
        }
        getRawQuestions();
    }, []);



    const handleClick = (event, questionId, ansIndex) => {
        const selected = questions.map(q => {
            console.log(q);
            // console.log(questionId);
            if (q.id === questionId) {
                console.log(q.answers[ansIndex]);
                q.answers[ansIndex].isSelected
            }

        })
    }

    //components to be rendered to screen
    const QuestionComponentsArr = questions.map(qObj => {
        // console.log(qObj);
        return (
            <SingleQuestion
                key={qObj.id}
                id={qObj.id}
                questionText={qObj.questionText}
                answers={qObj.answers}
                correct={qObj.correct}
                whenSelected={handleClick}
            />
        )
    });



    return (
        <div className="questions-container">
            {
                isLoaded
                    // ? <h1>Questions</h1>
                    ? <div className="all-questions-comp">{QuestionComponentsArr}</div>
                    : <p className="desc">Loading...</p>
            }
        </div>

        // {isLoaded && <div>
        //     <div className="all-questions-comp">{questionComponentsArr}</div>
        //     {isCheckAllAns && <div className="desc">You Got X/ 5 Questions Correctly</div>}
        //     <button className="check-btn"
        //         onClick={handleClick}
        //     >Check Answers</button>
        // </div>}
    )
}


