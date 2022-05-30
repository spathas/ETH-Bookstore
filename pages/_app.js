import { Web3Provider } from '@components/providers';
import Header from '@components/ui/header/Header';
import Footer from '@components/ui/footer/Footer';

//STYLES
import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/theme/theme';

function MyApp({ Component, pageProps }) {
  return (
    <Web3Provider>
      <ThemeProvider theme={theme}>
        {/* <Navbar /> */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100vh',
          }}
        >
          <div>
            <Header />
            <Component {...pageProps} />
          </div>
          <Footer />
        </div>
      </ThemeProvider>
    </Web3Provider>
  );
}

export default MyApp;
