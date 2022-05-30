import { useState } from 'react';

//MUI COMPONENTS
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

//STYLES
import { useTheme } from '@mui/material/styles';

function Filters({ getValue }) {
  const [value, setValue] = useState('title');
  const filters = ['title', 'popularity', 'year'];

  //STYLES
  const theme = useTheme();

  // YOU CAN FIND FILTERING LOGIC IN BOOK LIST COMPONENT "../books/BookCardList.js"

  const handleChange = (event) => {
    setValue(event.target.value);
    getValue(event.target.value);
  };

  return (
    <FormControl
      sx={{
        p: 2,
        backgroundColor: theme.palette.primary.main,
        borderRadius: '10px',
      }}
    >
      <FormLabel id='filters-label'>
        <Typography color={theme.palette.primary.contrastText}>
          Filter by:
        </Typography>
      </FormLabel>
      <RadioGroup
        row
        name='filters-radio-buttons'
        value={value}
        onChange={handleChange}
      >
        {filters.map((filter) => (
          <FormControlLabel
            key={`filter-${filter}`}
            value={filter}
            control={
              <Radio
                sx={{
                  color: theme.palette.primary.contrastText,
                  '&.Mui-checked': {
                    color: theme.palette.primary.contrastText,
                  },
                }}
              />
            }
            label={filter.charAt(0).toUpperCase() + filter.slice(1)}
            sx={{
              color: theme.palette.primary.contrastText,
            }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default Filters;
