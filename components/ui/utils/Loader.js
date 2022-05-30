//MUI COMPONENTS
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';

function Loader() {
  return (
    <Container
      sx={{
        height: '90vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress color='primary' />
    </Container>
  );
}

export default Loader;
