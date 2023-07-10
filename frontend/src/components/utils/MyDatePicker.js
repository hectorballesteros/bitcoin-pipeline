import React from 'react';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from "@mui/material/TextField";

const MyDatePicker = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        slotProps={{ textField: { size: 'small' } }}
        label="Fecha inicial"
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
            }
          },
          input: { color: 'rgba(255, 255, 255, 0.5)' },
          svg: { color: 'rgba(255, 255, 255, 0.5)' },
          label: { color: 'rgba(255, 255, 255, 0.5)' }
        }}
      />
    </LocalizationProvider>
  );
};

export default MyDatePicker;
