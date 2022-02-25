//fetching of quiz questions 
import React from "react";
import { useSelector, useDispatch } from "react-redux";

export default function FetchBtn(props){
  // access the settings that will be used to construct the API query
  const questionCategory = useSelector(state => state.options.question_category)
  const questionDifficulty = useSelector(state => state.options.question_difficulty)
  const questionType = useSelector(state => state.options.question_type)
  const questionAmount = useSelector(state => state.options.amount_of_questions)
  // const questionIndex = useSelector(state => state.index)

  const dispatch = useDispatch();

  const setLoading = value => {
    dispatch({
      type: 'CHANGE_LOADING',
      loading: value
    })
  }

  const setQuestions = value => {
    dispatch({
      type: 'SET_QUESTIONS',
      questions: value
    })
  }

  const handleQuery = async() => {
    let apiUrl = `https://opentdb.com/api.php?amount=${questionAmount}`;
    //always state number of questions 
    //add other parameters
    if(questionCategory.length){
      apiUrl = apiUrl.concat(`&category=${questionCategory}`);
    }
    if (questionDifficulty.length) {
      apiUrl = apiUrl.concat(`&difficulty=${questionDifficulty}`)
    }
    if (questionType.length) {
      apiUrl = apiUrl.concat(`&type=${questionType}`)
    }

    setLoading(true);

    await fetch(apiUrl)
      .then((res) => res.json())
      .then((respons) => {
        //set questions 
        setQuestions(respons.results);
        setLoading(false);
      });
  }

  return <button className="btn-colour" onClick={handleQuery}>{props.text}</button>
}