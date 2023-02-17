import { Typography } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import './style/productHeaderLocation.css';
import { useNavigate } from 'react-router-dom';

const ProductHeader = ( {item} ) => {

  const navigate = useNavigate();

  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  )

  useEffect(() => {
    window
    .matchMedia("(min-width: 768px)")
    .addEventListener('change', e => setMatches( e.matches ));
  }, []);

  return (
    <>
    <div className='productHeaderContainer'>
    <div className='leftContainer'>
        <Typography sx={{fontSize: '0.8rem', fontWeight: 'bold' }}> {item.categoria.titulo} </Typography>
        <Typography> {item.titulo} </Typography>
    </div>
    <div className='rightContainer'>
      {matches? 
      <button className='arrowBackIcon' onClick={() => {navigate('/')}}>
        <ArrowBackIosNewIcon fontSize='large' sx={{ height: '100%', color: 'white'}} />
      </button>
       : 
      <button className='arrowBackIcon' onClick={() => {navigate('/')}}>
        <ArrowBackIosNewIcon sx={{ height: '100%', color: 'white'}}/>
      </button>
      }
    </div>
    </div>
    </>

  )
}

export default ProductHeader