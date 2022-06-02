import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAccount, useNetwork } from '@components/hooks/web3';
import copy from 'copy-to-clipboard';
import { useWeb3 } from '@components/providers';

//MUI COMPONENTS
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import Fade from '@mui/material/Fade';
import Snackbar from '@mui/material/Snackbar';

//STYLES
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

function AuthUser() {
  const { connect, requireInstall } = useWeb3();
  const { account } = useAccount();
  const { network } = useNetwork();

  const router = useRouter();

  const [open, setOpen] = useState(false);

  //Styles
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const btnFont = matchesSM ? '0.5rem' : '1rem';

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const buttonHandler = () => {
    if (requireInstall)
      return (
        <Button
          color='warning'
          size={matchesSM ? 'small' : 'medium'}
          sx={{ fontSize: btnFont }}
          onClick={() => router.push('hhtps://metamask.io/')}
        >
          Please Install Metamask
        </Button>
      );

    if (!network.isSupported)
      return (
        <Button
          color='secondary'
          size={matchesSM ? 'small' : 'medium'}
          onClick={connect}
          sx={{ fontSize: btnFont }}
        >
          {`Select ${network.target}`}
        </Button>
      );

    return (
      <Button
        color='secondary'
        size={matchesSM ? 'small' : 'medium'}
        onClick={connect}
        sx={{ fontSize: btnFont }}
      >
        Connect to Metamask
      </Button>
    );
  };

  return (
    <>
      <Fade in={open} timeout={600}>
        <Snackbar
          open={open}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          autoHideDuration={3000}
          onClose={handleCloseAlert}
        >
          <Alert severity='info' onClose={handleCloseAlert} variant='filled'>
            You have copied your <strong>public key</strong>!
          </Alert>
        </Snackbar>
      </Fade>
      {!!account?.data ? (
        <Chip
          label={account.isAdmin ? `ADMIN: ${account.data}` : account.data}
          variant='outlined'
          color={account.isAdmin ? 'warning' : 'secondary'}
          size='large'
          onClick={() => {
            copy(account?.data);
            setOpen(true);
          }}
        />
      ) : (
        buttonHandler()
      )}
    </>
  );
}

export default AuthUser;
