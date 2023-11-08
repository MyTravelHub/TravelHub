import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const FullWidthTextField = ({ value, onChange, onSearch, loading }) => {
  return (
    <Box
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
    >
      <TextField
        fullWidth
        label="Search Airline Name & Flight No (ex: UA 1010)"
        id="fullWidth"
        value={value}
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSearch();
          }
        }}
        disabled={loading}
      />
    </Box>
  );
};

export default FullWidthTextField;
