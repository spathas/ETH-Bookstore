import { useState, useEffect, useCallback, memo } from 'react';
import ISBN from 'isbnjs';

//CUSTOM COMPONENTS
import CommonInput from './CommonInput';

//MUI COMPONENTS
import Box from '@mui/material/Box';

//VALIDATIONS
const validateIsbn13 = (value) => {
  value = value.trim().replaceAll('-', '');
  const lengthValidation = value.length === 13;

  const isbn = ISBN.parse(value);
  const isbnValidation = isbn !== null ? isbn.isIsbn13() : false;

  return lengthValidation && isbnValidation;
};

const validateIsbn10 = (value) => {
  value = value.trim().replaceAll('-', ''); // Delete default dashes for autocomple
  const lengthValidation = value.length === 10;

  const isbn = ISBN.parse(value);
  const isbnValidation = isbn !== null ? isbn.isIsbn10() : false;

  return lengthValidation && isbnValidation;
};
// ISBN example codes:
// ISBN-13 isNewIsbn: 9791234567896
// ISBN-13: 9780140266900 - With dashes: 978-0-14026-690-0
// ISBN-10: 0140266909 - With dashes: 0-14026-690-9

function IsbnInput({ getValues }) {
  const [isbn10, setIsbn10] = useState({});
  const [isbn13, setIsbn13] = useState({});

  // When ISBN-13 starts with '979' it means it cannot have a corresponding ISBN-10
  const isNewIsbn = !!isbn13.value
    ? isbn13.value.substring(0, 3) === '979'
    : false;

  // Validation functions ////////////////////////////////////////////////////
  const setIsbn13fn = useCallback((value) => setIsbn13(value), []);
  const setIsbn10fn = useCallback((value) => setIsbn10(value), []);

  // Extra validaiton: Required at least 1 ISBN is required, but it is not required to complete both ISBN.
  const isbn10NotRequired = isNewIsbn || (!!isbn13.value && !isbn10.value);
  const isbn13NotRequired = !!isbn10.value && !isbn13.value;

  // Component Functions //////////////////////////////////////////////////
  // Reset ISBNs
  const reset = useCallback(() => {
    // Reset values in CommonInput
    isbn10.reset();
    isbn13.reset();
  }, [isbn10, isbn13]);

  // Parse Values ///////////////////////////////////////////////////////////
  const returnValues = useCallback(() => {
    if (isNewIsbn)
      return getValues({
        value: [isbn13],
        isValid: isbn13.isValid,
        reset,
      });

    return getValues({
      value: [isbn13, isbn10],
      isValid: isbn10.isValid && isbn13.isValid,
      reset,
    });
  }, [getValues, isNewIsbn, isbn10, isbn13, reset]);

  useEffect(() => {
    returnValues();
  }, [returnValues]);

  // Render ////////////////////////////////////////////////////////////////
  return (
    <Box clone>
      <CommonInput
        name='ISBN-13'
        isRequired={!isbn10.value}
        validationFn={isbn13NotRequired ? () => true : validateIsbn13}
        getValues={setIsbn13fn}
      />
      {/* isbn13.toString().substring(0, 3) !== '979' */}
      <CommonInput
        name='ISBN-10'
        isRequired={!isbn13.value}
        validationFn={isbn10NotRequired ? () => true : validateIsbn10}
        getValues={setIsbn10fn}
        hidden={isNewIsbn}
      />
    </Box>
  );
}

export default memo(IsbnInput);
