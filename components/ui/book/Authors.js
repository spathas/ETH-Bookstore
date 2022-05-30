import React from 'react';

//MUI COMPONENTS
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

function Authors({ authors }) {
  let authorsData = [];

  if (Array.isArray(authors)) authorsData = authors;
  if (typeof authors === 'string') authorsData.push(authors);

  return (
    <Box>
      {authorsData.map((author) => (
        <Box
          key={`author-${author}`}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Avatar
            alt='Remy Sharp'
            src='/dummy/img/author/1.jpg'
            sx={{ m: 2 }}
          />
          <Typography variant='h6'>
            <strong>Authors: </strong>
            {author}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export default Authors;
