import { useEffect, useCallback, memo } from 'react';

//HOOKS
import useIsValid from '../../hooks/useIsValid';

//MUI COMPONENTS
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';

//STYLES
import Grow from '@mui/material/Grow';

const CommonInput = ({
  name,
  type = 'string',
  isRequired,
  isMultiline,
  firstUpper,
  validationFn,
  getValues,
  hidden,
}) => {
  //State
  const {
    value: enteredValue,
    isValid,
    hasError,
    valueChangedHandler,
    touchedHandler,
    reset,
  } = useIsValid(validationFn, firstUpper);

  // Parse Values /////////////////////
  const returnValues = useCallback(() => {
    return getValues({
      value: enteredValue,
      isValid: isValid,
      reset: reset,
    });
  }, [enteredValue, getValues, isValid, reset]);

  useEffect(() => {
    returnValues();
  }, [returnValues]);

  // if (name === 'title') console.log('render3');

  //Render
  return (
    <Grow in={!hidden} timeout={500}>
      <FormControl fullWidth margin='dense'>
        <InputLabel
          htmlFor={`${name}-input`}
          required={isRequired}
          error={hasError}
          focused
        >
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </InputLabel>
        <Input
          id={`${name}-input`}
          multiline={isMultiline}
          placeholder={`Enter the ${name} for this book...`}
          onChange={valueChangedHandler}
          onBlur={touchedHandler}
          error={hasError}
          value={enteredValue}
          type={type}
        />
      </FormControl>
    </Grow>
  );
};

export default memo(CommonInput);
