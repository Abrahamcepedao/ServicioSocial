import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

const TransparentInput = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius: 10,
    position: 'relative',
    outline: 'none',
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '6px 10px',
  },
  '&:focus': {
    borderRadius: 10,
  },
}));

export { TransparentInput }