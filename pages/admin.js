import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useWeb3 } from '@components/providers';
import { useAccount } from '@components/hooks/web3';

//MUI COMPONENTS
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

//STYLES
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

function AdminPanel() {
  const router = useRouter();
  const { contract } = useWeb3();
  const { account } = useAccount();

  const [newOwner, setNewOnwer] = useState();

  //Styles
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const rootMargin = matchesSM ? 0 : 4;

  useEffect(() => {
    if (account.data && !account.isAdmin) router.push('/');
  }, [account, router]);

  const changeContractOwner = async (newOwner) => {
    try {
      await contract.methods
        .transferOwnership(newOwner)
        .send({ from: account.data });
    } catch (error) {
      console.log(error);
      console.error('Change Owner of Contract: Operation has failed.');
    }
  };

  const stopContact = async () => {
    try {
      await contract.methods.stopContract().send({ from: account.data });
    } catch (error) {
      console.log(error);
      console.error('Change Owner of Contract: Operation has failed.');
    }
  };

  const resumeContract = async () => {
    try {
      await contract.methods.resumeContract().send({ from: account.data });
    } catch (error) {
      console.log(error);
      console.error('Change Owner of Contract: Operation has failed.');
    }
  };

  return (
    <>
      <Typography
        variant={matchesSM ? 'h4' : 'h3'}
        align='center'
        color='primary'
        sx={{ m: rootMargin }}
      >
        ADMIN PANEL
      </Typography>
      <Divider />
      {account.isAdmin && (
        <Grid
          container
          justifyContent='center'
          alignItems='center'
          sx={{ width: 'auto', m: rootMargin }}
        >
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Typography
              variant={matchesSM ? 'h6' : 'h5'}
              color='primary'
              align='center'
              sx={{ m: 1 }}
            >
              Change contract ownership
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <TextField
                id='outlined-basic'
                label='Enter New Owner Public Key'
                variant='outlined'
                onChange={(e) => setNewOnwer(e.target.value)}
                sx={{ mr: 1 }}
                size={matchesSM ? 'small' : 'medium'}
              />
              <Button
                variant='contained'
                disabled={account.isContractStopped}
                onClick={() => {
                  changeContractOwner(newOwner);
                  setNewOnwer(null);
                }}
              >
                Submit
              </Button>
            </Box>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Typography
              variant={matchesSM ? 'h6' : 'h5'}
              color='primary'
              align='center'
              sx={{ m: 1 }}
            >
              Stop / Start Contract
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <Button
                variant='contained'
                color='error'
                disabled={account.isContractStopped}
                onClick={stopContact}
                sx={{ m: 1 }}
              >
                Stop Contract
              </Button>
              <Button
                variant='contained'
                color='success'
                disabled={!account.isContractStopped}
                onClick={resumeContract}
                sx={{ m: 1 }}
              >
                Start Contract
              </Button>
            </Box>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Typography
              variant={matchesSM ? 'h6' : 'h5'}
              color='primary'
              align='center'
              sx={{ m: 1 }}
            >
              Withdraw Funds
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <TextField
                id='outlined-basic'
                label='Enter the Amount'
                variant='outlined'
                onChange={(e) => setNewOnwer(e.target.value)}
                sx={{ mr: 1 }}
                size={matchesSM ? 'small' : 'medium'}
              />
              <Button
                variant='contained'
                disabled={account.isContractStopped}
                onClick={() => {
                  changeContractOwner(newOwner);
                  setNewOnwer(null);
                }}
              >
                Withdraw
              </Button>
            </Box>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Typography
              variant={matchesSM ? 'h6' : 'h5'}
              color='primary'
              align='center'
              sx={{ m: 1 }}
            >
              Emergency Withdraw
            </Typography>
            <Typography
              variant={matchesSM ? 'body2' : 'body1'}
              color='primary'
              align='center'
              sx={{ m: 1 }}
            >
              Withdraw all of the funds from the contract. Requires the contract
              to be stopped.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <Button
                variant='contained'
                color='error'
                disabled={!account.isContractStopped}
                onClick={() => {
                  changeContractOwner(newOwner);
                  setNewOnwer(null);
                }}
              >
                Withdraw
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default AdminPanel;
