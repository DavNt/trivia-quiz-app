import React from "react";
import { useSelector, useDispatch } from "react-redux";
import FetchBtn from "./fetchbtn";
import Winstcker from '../resources/icons/undraw_winners_ao2o.svg';

export default function FinalScreen(){
  const score = useSelector((state) => state.score);

  const dispatch = useDispatch();

  const replay = () => {
    dispatch({
      type: 'SET_INDEX',
      index: 0,
    })
    dispatch({
      type: 'SET_SCORE',
      score: 0,
    })
  }

  const settings = () => {
    dispatch({
      type: 'SET_QUESTIONS',
      questions: [],
    })
    dispatch({
      type: 'SET_SCORE',
      score: 0,
    })
  }

  return (
    <div className="centerqtns mt-4">
      <div className="qtnbox">
        <div className="heading ">
          <h3>Quiz</h3>
        </div>
        <div className="innerqbox centercon">
          <img src={Winstcker} alt="" className="img-responsive " />
          <h1>Results</h1>
          <p>
            You got 
            <i className="scorcolor fs-3 fw-bold"> {score} </i> 
            correct answers
          </p>
          <button 
            onClick={replay}
            className="finbtns"
          >
            Try again
          </button><br/>
          {/* <FetchBtn text="Fetch new questions" /> */}
          <button 
            onClick={settings}
            className="finbtns"
          >
            Back to settings
          </button>

        </div>
      </div>
      {/* <h3>Final Score: {score}</h3> */}
    </div>
  )
}