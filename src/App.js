import React, {useState} from 'react';
import { questions as data, results } from './db/data';
import './App.css';

function App() {

  const [questions, setQuetions] = useState(data);
  const [resultVisible, handlResultVisible] = useState(false);

  const handelChosenAnswer = (event) => {
    const [id, score] = event.currentTarget.value.split('-');
    setQuetions(questions.map(question => question.id === Number(id) ? ({ ...question, chosenScore: Number(score) }) : question))
  }

  const handlSubmit = () => {
    handlResultVisible(true)
  }

  const handlReset = () => {
    setQuetions(data);
    handlResultVisible(false);
  }

  const sum = questions.reduce((acc, el) => acc + el.chosenScore, 0);

  const result = results.find(result => sum <= result.maxRequiredScore && sum >= result.minRequiredScore);

  const buttonDisabled = questions.some(question => !question.chosenScore);

  return (

    <div className={'mainpage'}>
      {questions.map(question => (
        <div key={question.id} className={'formQuestion'}>
          
          <div className={'formTest'} id={`question ${question.id}`} className={'formQuestion'}>

              <p>{question.title}</p>
              {question.answer.map(answer => (
                <div>
                  <input 
                    id={`${question.id}-${answer.id}`}
                    type='radio' 
                    name={`question ${question.id}`} 
                    value={`${question.id}-${answer.score}`}
                    onChange={handelChosenAnswer}
                    checked={question.chosenScore === answer.score}
                    className={'formQuestion'}  
                  />
                  <label for={`${question.id}-${answer.id}`}>{answer.title}</label>
                </div>
              ))}

          </div>
        </div>
      ))}
      <button onClick={handlSubmit} disabled={buttonDisabled}>
        Get answer
      </button>
      {resultVisible && (
        <div>
          <div>
            Result: {result ? result.title : ''}
          </div>
          <button onClick={handlReset}>
            Reset answer
          </button>
        </div>
      )}
    </div>
  );
}

export default App;