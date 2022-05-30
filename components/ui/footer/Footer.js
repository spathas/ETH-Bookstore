import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

//STYLES
import { useTheme } from '@mui/material/styles';

function Footer() {
  //Styles
  const theme = useTheme();

  return (
    <footer>
      <Box
        sx={{
          minHeight: '5vh',
          backgroundColor: theme.palette.primary.main,
          p: 1,
        }}
      >
        <Grid
          container
          justifyContent='center'
          alignItems='center'
          spacing={2}
          sx={{ pt: 2 }}
        >
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}></Grid>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Typography
              variant='h5'
              component='div'
              align='center'
              color='primary.contrastText'
            >
              BOOKSTORE FOOTER
            </Typography>
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            <Typography
              variant='body1'
              component='div'
              align='center'
              color='primary.contrastText'
            >
              Developed by: Christopher Spathas
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </footer>
  );
}

export default Footer;
