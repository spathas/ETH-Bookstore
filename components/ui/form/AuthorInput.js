import { useEffect, useCallback, memo } from 'react';

//HOOKS
import useIsValid from '../../hooks/useIsValid';

//MUI COMPONENTS
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';

//STYLES
import Grow from '@mui/material/Grow';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';

//INITIALIZATION
// To add more Author inputs just change this value
const MAX_NUMBER_OF_AUTHORS = 3;

const AuthorInput = ({
  extraAuthors,
  index,
  addAuthor,
  deleteAuthor,
  getValues,
  validationFn,
}) => {
  //State
  const {
    value: enteredValue,
    isValid,
    hasError,
    valueChangedHandler,
    touchedHandler,
    reset,
  } = useIsValid(validationFn);

  // Parse Values /////////////////////
  const returnValues = useCallback(() => {
    return getValues(
      {
        enteredValue,
        isValid,
        reset,
      },
      index
    );
  }, [enteredValue, getValues, index, isValid, reset]);

  useEffect(() => {
    returnValues();
  }, [returnValues]);

  //Render
  return (
    <Grow in timeout={500}>
      <FormControl fullWidth margin='dense'>
        <InputLabel
          htmlFor={`author-input-${index + 1}`}
          required
          focused
          error={hasError}
        >
          Author
        </InputLabel>
        <Input
          id={`author-input-${index + 1}`}
          placeholder={`Enter the author for this book...`}
          value={enteredValue}
          error={hasError}
          onChange={valueChangedHandler}
          onBlur={touchedHandler}
          endAdornment={
            <InputAdornment position='end'>
              {index === 0 && extraAuthors + 1 < MAX_NUMBER_OF_AUTHORS && (
                <IconButton aria-label='add author' onClick={addAuthor}>
                  <AddCircleRoundedIcon color='primary' />
                </IconButton>
              )}
              {index + 1 > extraAuthors && index !== 0 && (
                <IconButton
                  aria-label='delete author'
                  onClick={(e) => deleteAuthor(e, index)}
                >
                  <RemoveCircleRoundedIcon color='primary' />
                </IconButton>
              )}
            </InputAdornment>
          }
        />
      </FormControl>
    </Grow>
  );
};

export default memo(AuthorInput);
