import { useRouter } from 'next/router';
import slugify from 'slugify';

//MUI COMPONENTS
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { CardActionArea } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import { useOwnedBooks, useAccount } from '@components/hooks/web3';

function BookCard({ id, title, desc, rating, data }) {
  const router = useRouter();
  const { account } = useAccount();
  const { ownedBooks } = useOwnedBooks(data, account.data);

  const owned = !!ownedBooks.lookup[id];

  // Redirect user to book details page
  // We will using slugify to make a mock id for every book.
  // We need IDs to redirect the user to book details page.
  const handleClick = (title) => {
    const param = slugify(title);
    router.push(`/books/${param}`);
  };

  return (
    <Card sx={{ maxWidth: '280px' }} onClick={() => handleClick(title)}>
      <CardActionArea>
        <CardMedia
          component='img'
          width='280px'
          height='340px'
          image={`/book-images/${slugify(title)}.webp`}
          alt={slugify(title) + '--image'}
          sx={{ height: '340px' }}
        />
        <CardContent>
          <Typography gutterBottom variant='h6' component='div'>
            <Box
              component='div'
              overflow='hidden'
              textOverflow='ellipsis'
              whiteSpace='pre-line'
              maxHeight={60}
              minHeight={60}
              height={60}
            >
              {/* First later toUpperCase */}
              {title.charAt(0).toUpperCase() + title.slice(1)}
            </Box>
          </Typography>
          {desc && (
            <Tooltip
              title={<Typography variant='body1'>{desc}</Typography>}
              arrow
            >
              <Typography variant='body2' color='text.secondary' noWrap>
                {desc}
              </Typography>
            </Tooltip>
          )}
          <Grid container justifyContent='space-between' alignItems='center'>
            <Rating title='rating' value={rating} precision={0.5} readOnly />
            {owned && (
              <Box clone sx={{ display: 'flex' }}>
                <Typography sx={{ color: '#357a38' }}>Owned </Typography>
                <FileDownloadDoneIcon color='success' />
              </Box>
            )}
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default BookCard;
