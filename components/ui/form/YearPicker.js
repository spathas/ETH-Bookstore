import { useState, useEffect, useCallback, memo } from 'react';

//MUI COMPONENTS
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

//STYLES
import Grow from '@mui/material/Grow';

const YearPicker = ({ getValues }, ref) => {
  //Title state
  const [enteredValue, setEnteredValue] = useState(null);
  const [isValid, setIsValid] = useState(false);

  const changedHandler = (value) => {
    setEnteredValue(value);
    setIsValid(!!value);
  };

  const reset = () => {
    setEnteredValue(null);
    setIsValid(false);
  };

  // Parse Values /////////////////////
  const returnValues = useCallback(() => {
    return getValues({
      //EnteredValue is a Moment object
      value: enteredValue ? enteredValue.format('YYYY') : null,
      isValid,
      reset,
    });
  }, [enteredValue, getValues, isValid]);

  useEffect(() => {
    returnValues();
  }, [returnValues]);

  return (
    <Grow in timeout={500}>
      <Box clone>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DatePicker
            views={['year']} // If you want to add month and day picker add 'month' and 'day' to array
            showTodayButton
            allowSameDateSelection
            label='Published on:'
            value={enteredValue}
            openTo='year'
            onChange={changedHandler}
            renderInput={(params) => (
              <TextField
                required
                fullWidth
                variant='standard'
                margin='dense'
                type='number'
                {...params}
              />
            )}
          />
        </LocalizationProvider>
      </Box>
    </Grow>
  );
};

export default memo(YearPicker);
