import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useWeb3 } from '@components/providers';
import { useOwnedBooks, useWalletInfo } from '@components/hooks/web3';
import { useEthPrice } from '@components/hooks/useEthPrice';

//MUI COMPONENTS
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

//STYLES
import { useTheme } from '@mui/material/styles';

function BookPurchase({ book, data }) {
  const { web3, contract, requireInstall } = useWeb3();
  const { account, isConnecting } = useWalletInfo();
  const { ownedBooks } = useOwnedBooks(data, account.data);
  const { eth } = useEthPrice(book.price);

  const router = useRouter();

  const [trigger, setTrigger] = useState(false);

  const owned = !!ownedBooks.lookup[book.id];

  //Styles
  const theme = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setTrigger(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [trigger]);

  // Component Functions ////////////////////////
  const purchaseBook = async () => {
    console.log(book);
    console.log(account);
    const hexBookId = web3.utils.utf8ToHex(book.id);
    const proof = web3.utils.soliditySha3(
      { type: 'bytes16', value: hexBookId },
      { type: 'address', value: account.data }
    );

    const value = web3.utils.toWei(String(eth.perItem));
    _purchaseBook(hexBookId, proof, value);
  };

  const _purchaseBook = async (hexBookId, proof, value) => {
    try {
      const result = await contract.methods
        .purchaseBook(hexBookId, proof)
        .send({ from: account.data, value });
      console.log(result);
    } catch {
      console.error('Purchase book: Operation has failed.');
    }
  };

  const printButton = () => {
    if (requireInstall)
      return (
        <Button
          variant='contained'
          color='error'
          onClick={() => router.push('hhtps://metamask.io/')}
        >
          Install Metamask
        </Button>
      );

    if (isConnecting)
      return (
        <>
          {trigger && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography
                variant='h6'
                sx={{ color: theme.palette.warning.dark }}
              >
                Metamask not working. &nbsp;
              </Typography>
              <CircularProgress color='warning' size='2rem' />
            </Box>
          )}
          {!trigger && <CircularProgress color='primary' />}
        </>
      );

    if (!ownedBooks.hasInitialResponse)
      return (
        <>
          {trigger && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography
                variant='h6'
                sx={{ color: theme.palette.warning.dark }}
              >
                Connect to Metamask. &nbsp;
              </Typography>
              <CircularProgress color='warning' size='2rem' />
            </Box>
          )}
          {!trigger && <CircularProgress color='primary' />}
        </>
      );

    if (owned)
      return (
        <Button variant='contained' fullWidth disabled sx={{ width: '30%' }}>
          Yours &#10004;
        </Button>
      );

    return (
      <Button
        variant='contained'
        color='primary'
        disabled={account.isContractStopped}
        fullWidth
        onClick={purchaseBook}
        sx={{ width: '30%' }}
      >
        Buy
      </Button>
    );
  };

  return <>{printButton()}</>;
}

export default BookPurchase;
