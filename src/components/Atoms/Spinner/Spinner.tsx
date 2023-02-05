import { FC } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { SxProps } from '@mui/material';

interface SpinnerProps {
  BoxProps?: { sx?: SxProps };
}

const Spinner: FC<SpinnerProps> = ({ BoxProps }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...(BoxProps?.sx ? BoxProps.sx : {}),
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Spinner;
