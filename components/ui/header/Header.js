import { useState } from 'react';
import Link from 'next/link';
import { Link as LinkRouter } from '@mui/material';

//CUSTOM COMPONENTS
import MenuBar from '../nav/MenuBar';
import AuthUser from './AuthUser';

//MUI COMPONENTS
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

//STYLES
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function MenuAppBar() {
  const [triggerMenu, setTriggerMenu] = useState(false);

  //Styles
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <header>
      <AppBar position='sticky'>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Grid container justifyContent='space-between' alignItems='center'>
            <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
              <MenuBar
                triggerMenu={triggerMenu}
                closeBar={() => setTriggerMenu(false)}
              />

              <IconButton
                size='large'
                edge='start'
                color='inherit'
                aria-label='menu'
                onClick={() => setTriggerMenu(true)}
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
              <Link
                href='/'
                styles={{
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                <Typography
                  variant={matchesSM ? 'h4' : 'h6'}
                  component='div'
                  align='center'
                  sx={{ cursor: 'pointer' }}
                >
                  <LinkRouter
                    href='#'
                    component='span'
                    color='inherit'
                    underline='hover'
                  >
                    BOOKSTORE
                  </LinkRouter>
                </Typography>
              </Link>
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={3} xs={3} align='end'>
              <AuthUser />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </header>
  );
}
