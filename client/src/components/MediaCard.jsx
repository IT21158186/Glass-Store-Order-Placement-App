import * as React from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Favorite } from '@material-ui/icons';
import { IconButton } from '@mui/material';
import { useAuth } from '../pages/common/AuthContext';

export default function MediaCard({item}) {
  const { userRole } = useAuth();
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (userRole === 'customer') {
      navigate(`/itempage/${item._id}`);
    }
    else {
      navigate('/itempage');
    }
  };

  return (
    <Card sx={{ maxWidth: 200, }} onClick={handleCardClick} style={{ cursor: 'pointer' }} className='hover:scale-105 rounded-xl overflow-hidden'>
      <CardMedia
        sx={{ height: 160,width:200 }}
        image= {item?.image || "data:image/jpeg;base64,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"}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item?.title}
        </Typography>

        <Typography variant="body1" color="text.secondary">
          LKR. {item?.price}
        </Typography>
        {/* <Typography variant="caption" color="text.secondary">
          {item.desc}
        </Typography> */}
        {userRole === 'customer' && (
          <div  className='text-right'>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
