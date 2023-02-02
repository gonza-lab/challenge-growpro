import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Hero = () => {
  return (
    <Box
      sx={{
        pt: { xs: 4, md: 8 },
        pb: { xs: 1, md: 6 },
      }}
    >
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          BS: Bycicle Store
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          Here you can rent bicycles. There are three types: electric, normal
          and old.
        </Typography>
      </Container>
    </Box>
  );
};

export default Hero;
