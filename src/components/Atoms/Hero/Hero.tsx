import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Hero = () => {
  return (
    <Box
      sx={{
        pt: 8,
        pb: 6,
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
          and old. The electric ones cost the base price multiplied by the
          number of rental days, the normal ones cost the base price for the
          first three days and then the base price for each extra day. And
          finally the old ones the base price for the first 5 days and then the
          base price for each extra day.
        </Typography>
      </Container>
    </Box>
  );
};

export default Hero;
