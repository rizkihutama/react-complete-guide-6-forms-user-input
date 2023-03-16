import { useState } from 'react';

const useInput = (initialValue, validateInput) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const [isInputTouched, setIsInputTouched] = useState(false);

  const isInputValid = validateInput(inputValue);
  const isInputInvalid = !isInputValid && isInputTouched;

  const inputChangeHandler = (event) => {
    setInputValue(event.target.value);
  };

  const inputBlurHandler = (event) => {
    setIsInputTouched(true);
  };

  const resetInputState = () => {
    setInputValue(initialValue);
    setIsInputTouched(false);
  };

  return {
    inputValue,
    isInputValid,
    isInputInvalid,
    inputChangeHandler,
    inputBlurHandler,
    resetInputState,
  };
};

export default useInput;
