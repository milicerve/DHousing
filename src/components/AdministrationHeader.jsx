import React from 'react'
import { Typography } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/administrationHeader.css';


export const AdministrationHeader = () => {

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
    <div className='administrationProductHeaderContainer'>
    <div className='administrationLeftContainer'>
        <Typography sx={{fontSize: '1.2rem', fontWeight: '700' }} className='administrationLeftContainerTyp'> Administración </Typography>
    </div>
    <div className='administrationRightContainer'>
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
    <div className='administrationCreatProductTitle'>
        <Typography sx={{fontSize: '1.3rem', fontWeight: '700', color: '#607D8B'}} className='administrationCreatProductTitleTyp' > Crear propiedad </Typography>
    </div>
    </>

  )
}


export default AdministrationHeader