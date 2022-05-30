import { useState, useEffect, useCallback } from 'react';
import { removeDuplicates } from '@utils/data-manipulation';

//CUSTOM COMPONENTS
import BookCardSlider from './BookCardSlider';

//MUI COMPONENTS
import Grid from '@mui/material/Grid';

function SuggestedBooks({ book, booksArr }) {
  const [suggestedBooks, setSuggestedBooks] = useState(null);

  // Component Functions ///////////////////////////////////////
  // Return all books, those having at least 1 same category.
  const getBooksSameCategories = useCallback(
    (books, category) => {
      const tempArr = [];

      // Delete selected book from array of books
      books = books.filter((b) => b.title !== book.title);

      // Loop for the object categories
      for (let value in books) {
        // Extract the categories
        const categories = books[value].categories;

        const results = categories.filter((value) => {
          return value.toLowerCase() === category.toLowerCase();
        });

        if (results.length) {
          tempArr.push(books[value]);
        }
      }

      return tempArr;
    },
    [book]
  );

  // Filtering logic
  const returnSuggestedBooks = useCallback(() => {
    const bookCategories = book.categories;

    let tempArr = [];
    bookCategories.forEach((category) => {
      tempArr.push(getBooksSameCategories(booksArr, category));
    });

    // If categories are over that 1 the result is an Array of Arrays,
    // we have to convert the arrays to a single array structure and then
    // delete duplicate objects (based on the title).
    return removeDuplicates(tempArr);
  }, [book, booksArr, getBooksSameCategories]);

  // Update suggestedBooks
  useEffect(
    () => setSuggestedBooks(returnSuggestedBooks()),
    [returnSuggestedBooks]
  );

  //Redner /////////////////////////////////////////////
  return (
    <Grid container sx={{ mb: 2 }}>
      {suggestedBooks && (
        <BookCardSlider
          books={suggestedBooks}
          results={suggestedBooks.length}
        />
      )}
    </Grid>
  );
}

export default SuggestedBooks;
