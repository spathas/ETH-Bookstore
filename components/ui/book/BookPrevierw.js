import Image from 'next/image';
import slugify from 'slugify';

//CUSTOM COMPONENTS
import BookDetails from './BookDetails';
import Authors from './Authors';
import BookRating from './BookRating';

//MUI COMPONENTS
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

function BookPrevierw({ book, data }) {
  return (
    <Grid
      container
      spacing={3}
      sx={{ p: 5 }}
      justifyContent='space-around'
      direction='row-reverse'
    >
      <Grid item xl={5} lg={5} md={12} sm={12} xs={12}>
        <BookDetails book={book} data={data} />
      </Grid>
      <Grid
        item
        xl={5}
        lg={5}
        md={0}
        sm={0}
        xs={0}
        sx={{ '& img': { borderRadius: '5px' } }}
      >
        <Box clone sx={{ display: 'flex', justifyContent: 'center' }}>
          <Image
            src={`/book-images/${slugify(book.title)}.webp`}
            srcSet={`/book-images/${slugify(book.title)}.webp`}
            alt={book.title}
            width='500'
            height='700'
            loading='lazy'
          />
        </Box>
      </Grid>

      {/* Empty item */}
      <Grid item xl={6} lg={6} md={12} sm={12} xs={12} />
      <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
        <Authors authors={book.author} />
      </Grid>

      {/* Empty item */}
      <Grid item xl={6} lg={6} md={12} sm={12} xs={12} />
      <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
        <BookRating rating={book.rating} />
      </Grid>
    </Grid>
  );
}

export default BookPrevierw;
