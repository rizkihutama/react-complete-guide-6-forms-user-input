import { useState } from 'react';
import useInput from '../hooks/use-input';

const SimpleInput = (props) => {
  const {
    inputValue: enteredName,
    isInputValid: isNameInputValid,
    isInputInvalid: isNameInputInvalid,
    inputChangeHandler: nameInputChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
    resetInputState: resetNameInput,
  } = useInput('', (value) => value.trim() !== '');

  const [enteredEmail, setEnteredEmail] = useState('');
  const [isEmailInputTouched, setIsEmailInputTouched] = useState(false);

  const isEmailInputValid =
    enteredEmail.trim() !== '' &&
    enteredEmail.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
  const isEmailInputInvalid = !isEmailInputValid && isEmailInputTouched;

  let isFormValid = false;

  if (isNameInputValid && isEmailInputValid) isFormValid = true;

  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };
  const emailInputBlurHandler = (event) => {
    setIsEmailInputTouched(true);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (isNameInputInvalid && isEmailInputInvalid) return;

    console.log(`${enteredName} -> value from state`);

    resetNameInput();
    setIsEmailInputTouched(false);
  };

  const inputNameClasses = isNameInputInvalid
    ? 'form-control invalid'
    : 'form-control';

  const inputEmailClasses = isEmailInputInvalid
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
      <div className={inputEmailClasses}>
        <label htmlFor='email'>Your Email</label>
        <input
          type='email'
          id='email'
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        />
        {isEmailInputInvalid && <p className='error-text'>Email is Invalid</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!isFormValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
