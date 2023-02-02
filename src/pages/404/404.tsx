import { Typography, Box, Link as LinkMui } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        mt: 7,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
      }}
    >
      <Typography variant="h1" textAlign="center">
        Not Found :(
      </Typography>
      <Link to="/">
        <LinkMui>
          <Typography variant="h4">Go Home</Typography>
        </LinkMui>
      </Link>
    </Box>
  );
};

export default NotFoundPage;
