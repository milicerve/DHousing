import { Typography } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import React from 'react'
import './style/productHeaderLocation.css';

const ProductLocation = ( {item} ) => {

  return (
    <>
    <div className='locationContainer'>
    <div className='leftContainer'>
      <div className='city'>
        <LocationOnIcon sx={{color: '#263238'}} fontSize='small' />
        <Typography sx={{fontSize: '0.8rem', fontWeight: 'bold' }}> {item.ciudad.nombre + ', ' + item.ciudad.pais} </Typography>
      </div>
    </div>
    </div>
    </>

  )
}

export default ProductLocation