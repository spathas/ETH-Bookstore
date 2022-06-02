import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import slugify from 'slugify';
import { getAllBooks } from '@content/books/fetcher';
import { useAccount, useOwnedBooks } from '@components/hooks/web3';
import { useWeb3 } from '@components/providers';

//COMPONENTS
import Loader from '@components/ui/utils/Loader';

//MUI COMPONENTS
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Tooltip from '@mui/material/Tooltip';

//STYLES
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const CardItem = ({ book }) => {
  const router = useRouter();

  const publishedDate = new Date(book.published).toDateString();

  // Styles
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const gridSize = matchesSM ? 12 : 5;

  return (
    <Grid
      item
      sx={{
        m: 2,
        borderRadius: '10px',
        maxWidth: '1450px',
        width: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      <Card sx={{ display: 'flex' }}>
        <CardContent sx={{ width: '100%' }}>
          <Grid container spacing={matchesSM ? 1 : 3}>
            {/* TITLE */}
            <Grid
              item
              xl={gridSize}
              lg={gridSize}
              md={gridSize}
              sm={gridSize}
              xs={gridSize}
            >
              <Typography component='div' variant={matchesSM ? 'h6' : 'h4'}>
                {book.title}
              </Typography>
              {/* SUBTITLE */}
              {book?.subtitle && (
                <Typography
                  component='div'
                  variant={matchesSM ? 'body1' : 'h6'}
                >
                  {book.subtitle}
                </Typography>
              )}
              {/* Description */}
              <Typography
                variant={matchesSM ? 'subtitle2' : 'subtitle1'}
                color='text.secondary'
                component='div'
              >
                {book.description}
              </Typography>
            </Grid>
            <Grid
              item
              xl={gridSize}
              lg={gridSize}
              md={gridSize}
              sm={gridSize}
              xs={gridSize}
            >
              {/* AUTHORS */}
              <Typography variant={matchesSM ? 'body1' : 'h6'} noWrap>
                <strong>Authors: </strong>
                {Array.isArray(book.author)
                  ? book.author.join(', ')
                  : book.author}
              </Typography>
              {/* PUBLISHED/ER */}
              <Typography variant={matchesSM ? 'body1' : 'h6'} noWrap>
                <strong>Published: </strong>
                {publishedDate}
              </Typography>
              <Typography variant={matchesSM ? 'body1' : 'h6'} noWrap>
                <strong>Publisher: </strong>
                {book.publisher}
              </Typography>
              {/* CATEGORIES */}
              <Tooltip
                title={
                  <Typography variant={matchesSM ? 'subtitle2' : 'subtitle1'}>
                    {Array.isArray(book.categories)
                      ? book.categories.join(', ')
                      : book.categories}
                  </Typography>
                }
                arrow
              >
                <Typography variant={matchesSM ? 'body1' : 'h6'} noWrap>
                  <strong>Categories: </strong>
                  {Array.isArray(book.categories)
                    ? book.categories.join(', ')
                    : book.categories}
                </Typography>
              </Tooltip>
              {/* WEBSITE */}
              <Tooltip
                title={
                  <Typography variant={matchesSM ? 'subtitle2' : 'subtitle1'}>
                    {book.website}
                  </Typography>
                }
                arrow
              >
                <Typography variant={matchesSM ? 'body1' : 'h6'} noWrap>
                  <strong>Website: </strong>

                  <Link href={book.website}>
                    <a
                      target='_blank'
                      rel='noopener noreferrer'
                      style={{ textDecoration: 'underline' }}
                    >
                      {book.website}
                    </a>
                  </Link>
                </Typography>
              </Tooltip>
              {/* PROOF */}
              <Tooltip
                title={
                  <Typography variant='subtitle1'>{book.proof}</Typography>
                }
                arrow
              >
                <Typography variant={matchesSM ? 'body1' : 'h6'} noWrap>
                  <strong>Proof: </strong>
                  {book.proof}
                </Typography>
              </Tooltip>
              {/* PRICE */}
              <Typography component='div' variant={matchesSM ? 'body1' : 'h6'}>
                <strong>Price: </strong>
                {book.price} ETH
              </Typography>
              {/* BUTTONS */}
              <Button
                color='primary'
                variant='contained'
                sx={{ my: 2 }}
                onClick={() => router.push(`/books/${slugify(book.title)}`)}
              >
                Preview book
              </Button>
            </Grid>
          </Grid>
        </CardContent>
        {!matchesSM && (
          <CardMedia
            component='img'
            sx={{ width: 220 }}
            image={`/book-images/${slugify(book.title)}.webp`}
            alt='Live from space album cover'
          />
        )}
      </Card>
    </Grid>
  );
};

export default function Owned({ books }) {
  const { connect, isLoading, requireInstall } = useWeb3();
  const { account } = useAccount();
  const { ownedBooks } = useOwnedBooks(books, account.data);

  const [openLoader, setOpenLoader] = useState(true);

  //Styles
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const rootMargin = matchesSM ? '0.5rem' : '3rem';
  const alertWidth = matchesSM ? '100%' : '50%';

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpenLoader(isLoading);
    }, 100);

    return () => clearTimeout(timer);
  }, [isLoading]);

  if (isLoading || openLoader) return <Loader />;

  if (requireInstall && !isLoading)
    return (
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: rootMargin,
        }}
      >
        <Alert variant='filled' severity='error' sx={{ width: alertWidth }}>
          <AlertTitle>Install Metamask</AlertTitle>
          Please install Metamask to see your owned books.{' '}
          <Button
            color='secondary'
            onClick={() => window.open('https://metamask.io/')}
          >
            Press to install Metamask
          </Button>
        </Alert>
      </Box>
    );

  if (!account?.data) {
    return (
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: rootMargin,
        }}
      >
        <Alert variant='filled' severity='error' sx={{ width: alertWidth }}>
          <AlertTitle>Install Metamask</AlertTitle>
          Please connect to your Metamask account.{' '}
          <Button
            disableRipple
            onClick={connect}
            sx={{ color: 'white', textDecoration: 'underline' }}
          >
            PRESS TO CONNECT
          </Button>
        </Alert>
      </Box>
    );
  }

  return (
    <>
      <Typography
        variant={matchesSM ? 'h4' : 'h2'}
        color='text.primary'
        align='center'
      >
        My Books
      </Typography>
      <Grid container justifyContent='center'>
        {!!ownedBooks?.data &&
          ownedBooks.data.map((item) => <CardItem key={item.id} book={item} />)}
        {!ownedBooks?.data && 'No data found!'}
      </Grid>
    </>
  );
}

export function getStaticProps() {
  const { data } = getAllBooks();
  return {
    props: {
      books: data,
    },
  };
}
