import React from "react";
import { nanoid } from 'nanoid';
import SingleQuestion from "../SingleQuestion";
import Line from "../Line";

export default function Questions2(props) {

    const [questions, setQuestions] = React.useState([]);
    const [isLoaded, setisLoaded] = React.useState(false);
    const [isCheck, setIsCheck] = React.useState(false);
    const [isPlayAgain, setPlayAgain] = React.useState(false);
    const [numCorrectAnswers, setNumCorrectAnswers] = React.useState(0);


    React.useEffect(() => {
        const getQuestionsArr = (resultsArr) => {
            return resultsArr.map(questionObj => {
                const encodedArr = [...questionObj.incorrect_answers, questionObj.correct_answer];
                const ansArr = encodedArr.map(ans => atob(ans));
                const answerObjArr = ansArr.map(textAns => {
                    return {
                        id: nanoid(),
                        value: textAns,
                        isSelected: false,
                        isCorrect: false
                    }
                })

                answerObjArr[answerObjArr.length - 1].isCorrect = true;
                const shuffledAnsArr = answerObjArr.sort(() => 0.5 - Math.random());

                const qObjId = nanoid();
                return {
                    key: qObjId,
                    id: qObjId,
                    questionText: atob(questionObj.question),
                    correct: atob(questionObj.correct_answer),
                    answers: shuffledAnsArr,
                }
            })
        }

        async function getRawQuestions() {
            const res = await fetch
                (`https://opentdb.com/api.php?amount=5&category=${props.prefs.category}&difficulty=${props.prefs.difficulty}&encode=base64`);
            const data = await res.json();
            const questionObjArr = await getQuestionsArr(data.results);
            setQuestions(questionObjArr);
            setisLoaded(true);
        }
        getRawQuestions();
    }, [isPlayAgain]);


    React.useEffect(() => {
        let numCorrectAnswers = 0;
        questions.forEach(q => {
            q.answers.forEach(ans => {
                if (ans.isCorrect && ans.isSelected) {
                    numCorrectAnswers++;
                }
            })
        });

        setNumCorrectAnswers(numCorrectAnswers);
    }, [isCheck])

    const handleAnsClick = (event, questionId, ansIndex) => {
        if (isCheck) {
            return;
        }

        const selected = questions.map(q => {
            // console.log(q);
            // console.log(questionId);
            if (q.id === questionId) {
                q.answers.forEach(a => a.isSelected = false);
                q.answers[ansIndex].isSelected = true;
                // console.log(q.answers[ansIndex]);
            }
            return q;
        })
        setQuestions(selected);
    }

    const handleCheckClick = () => {
        // console.log("check ans");
        setIsCheck(true);
    }

    const handlePlayAgain = () => {
        setIsCheck(false);
        setisLoaded(false);
        setPlayAgain(prev => !prev);
    }

    //components to be rendered to screen
    const QuestionComponentsArr = questions.map((qObj, index) => {
        return (
            <div key={index}>
                <SingleQuestion
                    key={qObj.id}
                    id={qObj.id}
                    questionText={qObj.questionText}
                    answers={qObj.answers}
                    correct={qObj.correct}
                    whenSelected={handleAnsClick}
                    isCheckAnswers={isCheck}
                />
                <Line />
            </div>
        )
    });



    return (
        <div className="questions-container with-blobs">
            {isLoaded
                ? <div className="all-questions-comp">  {QuestionComponentsArr}
                </div>
                : <p className="desc">Loading...</p>
            }
            {
                isCheck && <h2 className="question-text ans-counter">
                    You scored {numCorrectAnswers}/5 correct answers!
                </h2>
            }
            <button className="check-btn"
                //"turn off" isCheck and then call set play again
                onClick={!isCheck ? handleCheckClick : handlePlayAgain}
            >{!isCheck ? "Check Answers" : "Play Again"}</button>
        </div>
    )
}


