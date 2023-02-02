import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BycicleCard = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardActionArea onClick={() => navigate('/5')}>
        <CardMedia
          sx={{ height: '200px' }}
          component="img"
          image="https://source.unsplash.com/random"
          alt="random"
        />
        <CardContent
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            alignItems: 'flex-start',
          }}
        >
          <Typography gutterBottom variant="h5" component="h2" sx={{ m: 0 }}>
            Bycicle Electric
            <Chip
              sx={{ ml: 1 }}
              label="Electrico"
              color="success"
              size="small"
            />
          </Typography>
          {/* <Chip label="Electrico" color="info" />
        <Chip label="Electrico" color="warning" /> */}
        </CardContent>
        {/* <CardActions>
        <Button variant="contained" size="small">
          View
        </Button>
      </CardActions> */}
      </CardActionArea>
    </Card>
  );
};

export default BycicleCard;
