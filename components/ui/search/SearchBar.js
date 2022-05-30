import { removeDuplicates } from '@utils/data-manipulation';

//MUI COMPONENTS
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';

//STYLES
import SearchIcon from '@mui/icons-material/Search';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { styled, alpha } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.light, 0.25),
  margin: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: '50%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

function SearchBar({ data, onSearchChanged }) {
  //Styles
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.up('sm'));

  // Search engine - Ignore all website links. At this time we search by keywords.
  // This is a basic searching, we can split the text to array. With this solution we can search by keywords
  // Return all books which contains the given search.
  const getBooksBySearch = (data, inputValue) => {
    //Search simple logic
    const tempArr = [];

    // Split input to keywords
    inputValue
      // We need a trim to delete spaces, otherwise, if the user enters an extra space the engine will return all over the books.
      .trim()
      // Split phrase into keywords
      .split(' ')
      .forEach((keyword) => {
        for (let value in data) {
          let values = Object.entries(data[value]);

          values = values.filter(
            ([key, value]) => key !== 'website' && typeof value === 'string'
          );

          const results = values.filter((value) => {
            return value[1].toLowerCase().includes(keyword.toLowerCase());
          });

          if (results.length) {
            tempArr.push(data[value]);
          }
        }
      });

    return removeDuplicates([...tempArr]);
  };

  const handleChange = (e) => {
    // The books are stored in data context and received in BookList component
    onSearchChanged(getBooksBySearch(data, e.target.value));
  };

  return (
    <section id='search'>
      <Typography
        variant={matchesSM ? 'h4' : 'h5'}
        align='center'
        sx={{ m: 2 }}
      >
        Search to find your new book
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder='Search for a new book...'
            inputProps={{ 'aria-label': 'search' }}
            onChange={handleChange}
          />
        </Search>
      </Box>
    </section>
  );
}

export default SearchBar;
