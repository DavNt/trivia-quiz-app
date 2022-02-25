//handling questions 
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Person from '../resources/icons/undraw_adventure_4hum.svg';

function decodeHTML(html) {
  const txt = document.createElement('textarea')
  txt.innerHTML = html
  return txt.value
}

export default function Question(){
  // retrieve score, questions and index from the store
  const score = useSelector(state => state.score);
  const questionIndex = useSelector(state => state.index);
  const encodedQuestions = useSelector(state => state.questions);
  const [questions, setQuestions] = useState([]);
  //answer options
  const [options, setOptions] = useState([]);

	// define dispatch
  const dispatch = useDispatch();

	// create variables for the question and correct answer
  const question = questions[questionIndex];
  const answer = question && question.correct_answer;

  //used to shuffle answers to list
  const getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
  }

  //ueffect to get and decode questions 
  useEffect(() => {
    const decodedQuestions = encodedQuestions.map(q => {
      return {
        ...q,
        question: decodeHTML(q.question),
        correct_answer: decodeHTML(q.correct_answer),
        incorrect_answers: q.incorrect_answers.map(a => decodeHTML(a)),
        // ...q
      }
    })
    setQuestions(decodedQuestions);
  }, [encodedQuestions])

  //ueffect for handling answers and shuffling them
  useEffect(() => {
    if(!question){
      return;
    }

    let answers = [...question.incorrect_answers];
    answers.splice(getRandomInt(question.incorrect_answers.length), 0, question.correct_answer);
    setOptions(answers);
  }, [question])

  //answer states
  const [answerSelected, setAnswerSelected] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleListItemClick = event => {
    //answer click functionalities 
    setAnswerSelected(true);
    setSelectedAnswer(event.target.textContent);

    if (event.target.textContent === answer) {
      dispatch({
        type: 'SET_SCORE',
        score: score + 1,
      })
    }

    if (questionIndex + 1 <= questions.length) {
      setTimeout(() => {
        setAnswerSelected(false);
        setSelectedAnswer(null);

        dispatch({
          type: 'SET_INDEX',
          index: questionIndex + 1,
        })
      }, 2500)
    }
  }

  //for styling answer clicks 
  const getClass = option => {
    if(!answerSelected){
      return ``;
    }
    if(option === answer){
      return `correct`;
    }
    if(option === selectedAnswer){
      return `selected`;
    }
  }
  return (
    <>
    {!question?(
      <div>Loading...</div>
    ):(
      <div className="centerqtns mt-4">
      <div className="qtnbox">
        <div className="qtnbox-top">
          <h3>Quiz</h3>
          <div></div>
          <img src={Person} alt="" className="qtnpic"/>
        </div>
        <div className="innerqbox">
        <p>Question {questionIndex + 1}</p>
        <h4>{question.question}</h4>
        <ol type="A" className="">
          <div className="">
          {options.map((option, i) => (
            <li key={i} 
              onClick={handleListItemClick}
              className={`listthings ${getClass(option)}`}
            >
              {option}
            </li>
          ))}
          </div>
        </ol>
        <div>
          Score: {score} / {questions.length}
        </div>
        </div>
      </div>
      </div>
    )}
    </>
  )
}