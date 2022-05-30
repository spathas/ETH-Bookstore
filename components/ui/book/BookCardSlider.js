import { useState, useEffect } from 'react';

//CUSTOM COMPONENTS
import BookCard from './BookCard';

//MUI COMPONENTS
import { Box, Grid, Grow } from '@mui/material';

//STYLES
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  centeredText: {
    textAlign: 'center',
  },
});

export default function BookCardSlider({ books, results }) {
  const [pointer, setPointer] = useState(0);
  const [booksOnSlider, setBooksOnSlider] = useState(0);

  //Styles
  const classes = useStyles();
  const theme = useTheme();
  const matchesXL = useMediaQuery(theme.breakpoints.up('xl'));
  const matchesLG = useMediaQuery(theme.breakpoints.up('lg'));
  const matchesMD = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    initBooksOnSlider();
  });

  //Initialize elements number based on screen width
  const initBooksOnSlider = () => {
    if (matchesXL) return setBooksOnSlider(4);
    if (matchesLG) return setBooksOnSlider(3);
    if (matchesMD) return setBooksOnSlider(2);
  };

  const cardItemsHandler = () => {
    let selectedBooks = [];

    if (results > booksOnSlider) {
      selectedBooks = books.slice(pointer, booksOnSlider + pointer);
    } else {
      selectedBooks = books;
    }

    return selectedBooks.map((book) => (
      <Grow key={book.title} timeout={500} in mountOnEnter unmountOnExit>
        <Grid item>
          <BookCard title={book.title} rating={4} />
        </Grid>
      </Grow>
    ));
  };

  const moveToLeft = () => {
    setPointer(pointer - 1);
  };

  const moveToRight = () => {
    setPointer(pointer + 1);
  };

  return (
    <Box sx={{ width: '100%', m: 2, overflow: 'hidden' }}>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
      >
        <Grid
          item
          xl={1}
          lg={1}
          md={1}
          sm={1}
          xs={1}
          className={classes.centeredText}
        >
          {pointer > 0 && (
            <ArrowBackIosNewIcon
              color='primary'
              onClick={moveToLeft}
              fontSize='large'
              sx={{ cursor: 'pointer' }}
            />
          )}
        </Grid>

        <Grid
          container
          justifyContent='space-around'
          alignItems='center'
          item
          xl={10}
          lg={10}
          md={10}
          sm={10}
          xs={10}
        >
          {books && cardItemsHandler()}
        </Grid>
        <Grid
          item
          xl={1}
          lg={1}
          md={1}
          sm={1}
          xs={1}
          className={classes.centeredText}
        >
          {pointer < results - booksOnSlider && (
            <ArrowForwardIosIcon
              onClick={moveToRight}
              fontSize='large'
              color='primary'
              sx={{ cursor: 'pointer' }}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
