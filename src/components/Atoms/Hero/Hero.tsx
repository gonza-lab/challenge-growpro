import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        pt: { xs: 3, md: 7 },
        pb: { xs: 1, md: 3 },
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
          {t('hero.description')}
        </Typography>
      </Container>
    </Box>
  );
};

export default Hero;
