import { useState, useEffect, useCallback, useContext, memo } from 'react';

//CONTEXTS
import DataContext from '../../contexts/data-context';

//MUI COMPONENTS
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

//STYLES
import Grow from '@mui/material/Grow';

//INITIALIZATION
const MAX_NUMBER_OF_CATEGORIES = 4;

const CategoriesSelector = ({ getValues }) => {
  const categories = useContext(DataContext).categories;

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isTouched, setIsTouched] = useState(false);

  const isValid =
    selectedCategories.length > 0 &&
    selectedCategories.length <= MAX_NUMBER_OF_CATEGORIES;
  const hasError = !isValid && isTouched;

  // Reset inputs
  const reset = () => {
    setSelectedCategories('');
    setIsTouched(false);
  };

  // Parse Values /////////////////////
  const returnValues = useCallback(() => {
    getValues({
      value: selectedCategories,
      isValid,
      reset,
    });
  }, [getValues, isValid, selectedCategories]);

  useEffect(() => {
    returnValues();
  }, [returnValues]);

  // Component functions //////////////////////////
  const valueChangedHandler = (e) => {
    if (!isTouched) setIsTouched(true);

    const value = e.target.value;
    // On autofill we get a stringified value.
    setSelectedCategories(typeof value === 'string' ? value.split(',') : value);
  };

  //Render
  return (
    <Grow in timeout={500}>
      <FormControl fullWidth margin='dense'>
        <InputLabel id='select-chip-label' required>
          Categories
        </InputLabel>
        <Select
          error={hasError}
          labelId='select-chip-label'
          id='select-chip'
          multiple
          value={[...selectedCategories]}
          onChange={valueChangedHandler}
          input={<Input id='input-chip' label='Chip' />}
          renderValue={(selected) => (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 0.5,
              }}
            >
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  color={selectedCategories.length > 4 ? 'error' : 'primary'}
                />
              ))}
            </Box>
          )}
        >
          {categories.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grow>
  );
};

export default memo(CategoriesSelector);
