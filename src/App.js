import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import Qsettings from './components/qsettings';
import Question from './components/question';
import FinalScreen from './components/finalscreen';

function App() {
  const questions = useSelector((state) => state.questions)
  const questionIndex = useSelector((state) => state.index)

  let component

  if (questions.length && questionIndex + 1 <= questions.length) {
    component = <Question />
  } else if (!questions.length) {
    component = <Qsettings />
  } else {
    component = <FinalScreen />
  }
  return (
    <div className="App ">
      {/* <div className='container-fluid m-0 mb-0'> */}
        {component}
      {/* </div> */}
    </div>
  );
}

export default App;
