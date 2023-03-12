import { useEffect, useRef, useState } from "react";

const SimpleInput = (props) => {
    const nameInputRef = useRef();
    const [enteredName, setEnteredName] = useState('');
    const [isNameInputValid, setIsNameInputValid] = useState(false);
    const [isNameInputTouched, setIsNameInputTouched] = useState(false);

    useEffect(() => {
        if (isNameInputValid) {
            console.log('Name input is valid');
        }
    }, [isNameInputValid]);

    const validateNameInputField = () => {
        if (enteredName.trim() === '') {
            setIsNameInputValid(false);
            return false;
        }

        return true;
    }

    const nameInputChangeHandler = event => {
        setEnteredName(event.target.value);
    };

    const nameInputBlurHandler = event => {
        setIsNameInputTouched(true);
        if (!validateNameInputField())
        {
            return;
        }
    };

    const formSubmitHandler = event => {
        event.preventDefault();

        setIsNameInputTouched(true);
        if (!validateNameInputField())
        {
            return;
        }
        
        setIsNameInputValid(true);
        console.log(`${enteredName} -> value from state`);

        const inputNameValue = nameInputRef.current.value;

        console.log(`${inputNameValue} -> value from ref`);

        // nameInputRef.current.value = '' -> NOT IDEAL, DON'T MANIPULATE DOM STRAIGHT TROUGH VANILLA JS, LET THE REACT DO THE JOB
        setEnteredName('');
    };

    const isNameInputInvalid = !isNameInputValid && isNameInputTouched;
    const inputNameClasses = isNameInputInvalid ?  'form-control invalid' : 'form-control';

    return (
        <form onSubmit={formSubmitHandler}>
            <div className={inputNameClasses}>
                <label htmlFor='name'>Your Name</label>
                <input ref={nameInputRef} type='text' id='name' onChange={nameInputChangeHandler} onBlur={nameInputBlurHandler} value={enteredName} />
                {isNameInputInvalid && <p className="error-text">Name is Required</p>}
            </div>
            <div className="form-actions">
                <button>Submit</button>
            </div>
        </form>
    );
};

export default SimpleInput;