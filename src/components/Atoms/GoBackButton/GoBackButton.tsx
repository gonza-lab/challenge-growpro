import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Link as MuiLink } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';

const GoBackButton = () => {
  const { t } = useTranslation();

  return (
    <>
      <MuiLink component={Link} to="/">
        <ArrowBackIcon sx={{ mr: 1 }} />
        <Typography>{t('go_back')}</Typography>
      </MuiLink>{' '}
    </>
  );
};

export default GoBackButton;
