import { useState, useEffect, useCallback, memo } from 'react';

import AuthorInput from './AuthorInput';

//MUI COMPONENTS
import Box from '@mui/material/Box';

//INITIALIZATION
// To add more Author inputs just change this value
const MAX_NUMBER_OF_AUTHORS = 3;

const AuthorList = ({ validateAuthor, getValues }) => {
  const [enteredAuthors, setEnteredAuthors] = useState([]);
  const [extraAuthors, setExtraAuthors] = useState(0);

  // Component functions //////////////////////////////
  // Reset Authos and close extra inputs
  const resetAuthors = useCallback(() => {
    enteredAuthors.forEach((author) => author.reset());
    setEnteredAuthors([]);
    setExtraAuthors(0);
  }, [enteredAuthors]);

  // Extra Authors Functionalities
  //Add 1 more input field to the list of authors input fields.
  const addAuthor = useCallback(
    (e) => {
      e.preventDefault();

      if (extraAuthors < MAX_NUMBER_OF_AUTHORS - 1)
        setExtraAuthors((prev) => prev + 1);
    },
    [extraAuthors]
  );

  //Delete the last input field from the list
  const deleteAuthor = useCallback(
    (e, index) => {
      e.preventDefault();

      if (!!enteredAuthors[index] && extraAuthors > 0) {
        setExtraAuthors((prev) => prev - 1);
        setEnteredAuthors((prev) => {
          prev.splice(index, 1);
          return [...prev];
        });
      }
    },
    [enteredAuthors, extraAuthors]
  );

  // Parse Values //////////////////////////////////////
  const returnValues = useCallback(() => {
    return getValues({
      value: enteredAuthors,
      isValid: enteredAuthors.filter((a) => !a.isValid).length === 0,
      reset: resetAuthors,
    });
  }, [enteredAuthors, getValues, resetAuthors]);

  useEffect(() => {
    returnValues();
  }, [returnValues]);

  const getAuthors = useCallback((author, index) => {
    setEnteredAuthors((prev) => {
      prev[index] = author;
      // Don't remove spead operator because we need to re-render the component for this chage
      return [...prev];
    });
  }, []);

  // Render Children (Components) //////////////////////////////
  //Store input fields (components). [authorsInputs]
  const returnAuthors = () => {
    let count = 0;
    const authorsInputs = [];

    while (count < extraAuthors + 1) {
      // Add component to array
      authorsInputs.push(
        <AuthorInput
          key={`author-input-${count + 1}`}
          extraAuthors={extraAuthors}
          index={count}
          addAuthor={addAuthor}
          deleteAuthor={deleteAuthor}
          getValues={getAuthors}
          validationFn={validateAuthor}
        />
      );

      count++;
    }

    return authorsInputs;
  };

  //Render
  return <Box>{returnAuthors().map((el) => el)}</Box>;
};

export default memo(AuthorList);
