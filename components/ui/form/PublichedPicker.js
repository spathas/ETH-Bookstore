import { useState, useEffect, useCallback, memo } from 'react';

//CUSTOM COMPONENTS
import CommonInput from './CommonInput';
import YearPicker from './YearPicker';

//MUI COMPONENTS
import Grid from '@mui/material/Grid';
function PublichedPicker({ validationFn, getValues }) {
  const [publisher, setPublisher] = useState({});
  const [year, setYear] = useState({});

  // Parse Values /////////////////////
  const returnValues = useCallback(() => {
    return getValues({
      publisher,
      year,
      isValid: publisher.isValid && year.isValid,
      reset: () => {
        publisher.reset();
        year.reset();
      },
    });
  }, [getValues, publisher, year]);

  useEffect(() => {
    returnValues();
  }, [returnValues]);

  return (
    <Grid container justifyContent='space-between'>
      <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
        <CommonInput
          name='publisher'
          isRequired
          validationFn={validationFn}
          getValues={useCallback((value) => setPublisher(value), [])}
        />
      </Grid>
      <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
        <YearPicker getValues={useCallback((value) => setYear(value), [])} />
      </Grid>
    </Grid>
  );
}

export default memo(PublichedPicker);
