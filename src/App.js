import React, {useState} from 'react';
import { questions as data, results } from './db/data';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import './App.css';

function App() {

  const [questions, setQuetions] = useState(data);
  const [resultVisible, handleResultVisible] = useState(false);

  const handelChosenAnswer = (event) => {
    const [id, score] = event.currentTarget.value.split('-');
    setQuetions(questions.map(question => question.id === Number(id) ? ({ ...question, chosenScore: Number(score) }) : question))
  }

  const handleSubmit = () => {
    handleResultVisible(true);
  }

  const handleReset = () => {
    setQuetions(data);
    handleResultVisible(false);
  }

  const sum = questions.reduce((acc, el) => acc + el.chosenScore, 0);

  const result = results.find(result => sum <= result.maxRequiredScore && sum >= result.minRequiredScore);

  const buttonDisabled = questions.some(question => !question.chosenScore);

  return (

    <div className={'mainpage'}>
      <h1>Test on what is you human ?</h1>
      <div className={'formQuestion'}>
        {questions.map(question => (
          <FormControl key={question.id} component="fieldset">
            <FormLabel className={'pTitle'}>{question.title}</FormLabel>
            {question.answer.map(answer => (
              <RadioGroup>
                <div className={'radiogroup'}> 
                  <FormControlLabel  
                    id={`${question.id}-${answer.id}`}
                    type='radio' 
                    name={`question ${question.id}`} 
                    value={`${question.id}-${answer.score}`}
                    control={<Radio color="primary"/>}
                    onChange={handelChosenAnswer}
                    checked={question.chosenScore === answer.score} 
                    disabled={resultVisible}
                    className={'labelInput'}
                  />
                  <label for={`${question.id}-${answer.id}`}>{answer.title}</label>
                </div> 
              </RadioGroup>
            ))}
          </FormControl>
        ))}
      </div>
        <Button className={'buttonSize'} onClick={handleSubmit} disabled={buttonDisabled} variant="outlined" color="secondary">
          Get answer
        </Button>
        {resultVisible && (
          <div className={'answerResult'}>
            <div className={'result'}>
              Result: {result ? result.title : ''}
            </div>
            <Button className={'buttonSize'} onClick={handleReset} variant="contained" color="secondary">
              Reset answer
            </Button>
          </div>
        )}
    </div>
  );
}

export default App;