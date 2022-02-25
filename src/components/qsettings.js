//settings quiz preferences 
import React, {useEffect, useState} from "react";
//useSelector allows us to access the state, while we can use useDispatch to update it
import { useSelector, useDispatch } from "react-redux";

import FetchBtn from "./fetchbtn";

export default function Qsettings(){
  const [opt, setOpt] = useState(null); //options for a quiz

  const loading = useSelector(state => state.options.loading); //data loading effects 
  const qcategory = useSelector(state => state.options.question_category); //questions category 
  const questionDifficulty = useSelector(state => state.options.question_difficulty)
  const questionType = useSelector(state => state.options.question_type)
  const numberOfQuestions = useSelector(state => state.options.amount_of_questions)

  const dispatch = useDispatch(); //for defining action 

  useEffect(() => {
    const apiUrl = `https://opentdb.com/api_category.php`;

    const handleLoadingChange = value => {
      dispatch({
        type: 'CHANGE_LOADING',
        loading: value,
      })
    }

    handleLoadingChange(true);

    fetch(apiUrl)
      .then((res) => res.json())
      .then((respons) => {
        setOpt(respons.trivia_categories);
        handleLoadingChange(false);
      });
  }, [setOpt], dispatch);

  const handleCategoryChange = event => {
    dispatch({
      type: 'CHANGE_CATEGORY',
      value: event.target.value
    })
  }

  const handleDifficultyChange = event => {
    dispatch({
      type: 'CHANGE_DIFFICULTY',
      value: event.target.value
    })
  }

  const handleTypeChange = event => {
    dispatch({
      type: 'CHANGE_TYPE',
      value: event.target.value
    })
  }

	const handleAmountChange = event => {
    dispatch({
      type: 'CHANGE_AMOUNT',
      value: event.target.value
    })
  }

  return(
    <>
    {!loading?(
      <>
      <div className="row justify-content-center">
        <div className="col-mb-9 m-3">
          <h2 className="text-center">Take a Quiz</h2>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-sm-9 mb-3">
          <label className="form-label fw-bold">Select category</label>
          <select className="form-select" value={qcategory} onChange={handleCategoryChange}>
            <option>All</option>
            {opt && opt.map((options) => (
              <option value={options.id} key={options.id}>
                {options.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-sm-9 mb-3">
          <label className="form-label fw-bold">Select Difficulty:</label>
          <select className="form-select" value={questionDifficulty} onChange={handleDifficultyChange}>
            <option value="" key="difficulty-0">All</option>
            <option value="easy" key="difficulty-1">Easy</option>
            <option value="medium" key="difficulty-2">Medium</option>
            <option value="hard" key="difficulty-3">Hard</option>
          </select>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-sm-9 mb-3">
          <div className="form-group ">
            <label className="form-label fw-bold">
              Select Question Type:
            </label>
            <select className="form-select" value={questionType} onChange={handleTypeChange} name="qtype">
              <option value="" key="type-0">All</option>
              <option value="multiple" key="type-1">Multiple Choice</option>
              <option value="boolean" key="type-2">True/False</option>
            </select>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-sm-9 mb-3">
          <div className="form-group">
            <label className="form-label fw-bold">Amount of Questions:</label>
            <input className="form-control" value={numberOfQuestions} onChange={handleAmountChange}/>
          </div>
        </div>
      </div>

      <div className="m-3 putcenter">
        <FetchBtn text="Submit"/>
      </div>
      </>
    ):(
      <p>Loading....</p>
    )}
    </>
  )
}