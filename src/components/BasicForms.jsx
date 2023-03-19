import useMultipleInput from '../hooks/useMultipleInput';

const BasicForm = (props) => {
  const defaultInputValues = {
    firstName: '',
    lastName: '',
    email: '',
  };

  const defaultTouchedValues = {
    firstName: false,
    lastName: false,
    email: false,
  };

  const defaultInputIsValid = {
    firstName: false,
    lastName: false,
    email: false,
  };

  const defaultInputIsInvalid = {
    firstName: false,
    lastName: false,
    email: false,
  };

  const {
    inputValues: inputValues,
    isInputTouched: isInputTouched,
    isInputValid: isInputValid,
    setIsInputValid,
    isInputInvalid: isInputInvalid,
    setIsInputInvalid,
    inputChangeHandler,
    inputBlurHandler,
    resetAllInputState,
  } = useMultipleInput(
    defaultInputValues,
    defaultTouchedValues,
    defaultInputIsValid,
    defaultInputIsInvalid,
    () => {
      const {
        firstName: firstNameInputValue,
        lastName: lastNameInputValue,
        email: emailInputValue,
      } = inputValues;

      const {
        firstName: firstNameIsTouched,
        lastName: lastNameIsTouched,
        email: emailIsTouched,
      } = isInputTouched;

      setIsInputValid({
        ...isInputValid,
        firstName: firstNameInputValue.trim() !== '',
        lastName: lastNameInputValue.trim() !== '',
        email:
          emailInputValue.trim() !== '' &&
          (emailInputValue.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) == null
            ? false
            : true),
      });

      const {
        firstName: firstNameIsValid,
        lastName: lastNameIsValid,
        email: emailIsValid,
      } = isInputValid;

      setIsInputInvalid({
        ...isInputInvalid,
        firstName: !firstNameIsValid && firstNameIsTouched,
        lastName: !lastNameIsValid && lastNameIsTouched,
        email: !emailIsValid && emailIsTouched,
      });
    }
  );

  let isFormValid =
    isInputValid.firstName && isInputValid.lastName && isInputValid.email;

  const formSubmitHandler = (event) => {
    event.preventDefault();

    console.log(`${inputValues.firstName} -> First Name`);
    console.log(`${inputValues.lastName} -> Last Name`);
    console.log(`${inputValues.email} -> Email`);

    resetAllInputState();
  };

  const inputFirstNameClasses = isInputInvalid.firstName
    ? 'form-control invalid'
    : 'form-control';

  const inputLastNameClasses = isInputInvalid.lastName
    ? 'form-control invalid'
    : 'form-control';

  const inputEmailClasses = isInputInvalid.email
    ? 'form-control invalid'
    : 'form-control';

  return (
    <form onSubmit={formSubmitHandler}>
      <div className='control-group'>
        <div className={inputFirstNameClasses}>
          <label htmlFor='firstName'>First Name</label>
          <input
            type='text'
            id='firstName'
            name='firstName'
            onChange={inputChangeHandler}
            onBlur={inputBlurHandler}
            value={inputValues.firstName}
          />
          {isInputInvalid.firstName && (
            <p className='error-text'>First Name is Invalid</p>
          )}
        </div>
        <div className={inputLastNameClasses}>
          <label htmlFor='lastName'>Last Name</label>
          <input
            type='text'
            id='lastName'
            name='lastName'
            onChange={inputChangeHandler}
            onBlur={inputBlurHandler}
            value={inputValues.lastName}
          />
          {isInputInvalid.lastName && (
            <p className='error-text'>Last Name is Invalid</p>
          )}
        </div>
      </div>
      <div className={inputEmailClasses}>
        <label htmlFor='email'>E-Mail Address</label>
        <input
          type='email'
          id='email'
          name='email'
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler}
          value={inputValues.email}
        />
        {isInputInvalid.email && <p className='error-text'>Email is Invalid</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!isFormValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
