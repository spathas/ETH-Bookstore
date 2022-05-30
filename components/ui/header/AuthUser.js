import { useState } from 'react';
import Link from 'next/link';
import { useAccount } from '@components/hooks/web3';
import copy from 'copy-to-clipboard';
import { useWeb3 } from '@components/providers';

//MUI COMPONENTS
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import Fade from '@mui/material/Fade';
import Snackbar from '@mui/material/Snackbar';

function AuthUser() {
  const { connect, requireInstall } = useWeb3();
  const { account } = useAccount();

  const [open, setOpen] = useState(false);

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const buttonHandler = () => {
    if (requireInstall)
      return (
        <Link href='https://metamask.io/'>
          <a target='_blank' rel='noopener noreferrer'>
            PLEASE INSTALL METAMASK
          </a>
        </Link>
      );

    return (
      <Button color='secondary' onClick={connect}>
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
