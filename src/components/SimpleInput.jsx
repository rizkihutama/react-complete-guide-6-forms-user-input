import { useState } from 'react';

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [isNameInputTouched, setIsNameInputTouched] = useState(false);
  const [isEmailInputTouched, setIsEmailInputTouched] = useState(false);

  const isNameInputValid = enteredName.trim() !== '';
  const isNameInputInvalid = !isNameInputValid && isNameInputTouched;
  const isEmailInputValid =
    enteredEmail.trim() !== '' &&
    enteredEmail.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
  const isEmailInputInvalid = !isEmailInputValid && isEmailInputTouched;

  let isFormValid = false;

  if (isNameInputValid && isEmailInputValid) {
    isFormValid = true;
  }

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const nameInputBlurHandler = (event) => {
    setIsNameInputTouched(true);
  };

  const emailInputBlurHandler = (event) => {
    setIsEmailInputTouched(true);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    setIsNameInputTouched(true);
    if (isNameInputInvalid) return;

    console.log(`${enteredName} -> value from state`);

    setEnteredName('');
    setEnteredEmail('');
    setIsNameInputTouched(false);
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
