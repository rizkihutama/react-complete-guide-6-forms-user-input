import { useState } from 'react';

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState('');
  const [isNameInputTouched, setIsNameInputTouched] = useState(false);

  const isNameInputValid = enteredName.trim() !== '';
  const isNameInputInvalid = !isNameInputValid && isNameInputTouched;

  useEffect(() => {
    if (isNameInputValid) {
      console.log('Name input is valid');
    }
  }, [isNameInputValid]);

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const nameInputBlurHandler = (event) => {
    setIsNameInputTouched(true);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    setIsNameInputTouched(true);
    if (isNameInputInvalid) return;

    console.log(`${enteredName} -> value from state`);

    // nameInputRef.current.value = '' -> NOT IDEAL, DON'T MANIPULATE DOM STRAIGHT TROUGH VANILLA JS, LET THE REACT DO THE JOB
    setEnteredName('');
    setIsNameInputTouched(false);
  };

  const inputNameClasses = isNameInputInvalid
    ? 'form-control invalid'
    : 'form-control';

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={inputNameClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {isNameInputInvalid && <p className='error-text'>Name is Required</p>}
      </div>
      <div className='form-actions'>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
