import { Box } from '@mui/material';
import React, { useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import './style/favoriteButton.css';

const FavoriteButton = () => {

    const [isFavorite, setIsFavorite] = useState(false);
	
	const handlePress = () => {
    setIsFavorite(!isFavorite);
    };

  return (
    <>
    <Box sx={{paddingLeft: '2rem', paddingTop: '1rem'}} onClick={() => handlePress()}>
        {isFavorite ? (
          <FavoriteIcon sx={{color: 'gray'}}/>
        ) : (
          <FavoriteBorderIcon sx={{color: 'gray'}}/>
        )}
    </Box>
    </>
  )
}

export default FavoriteButton