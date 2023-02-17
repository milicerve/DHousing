import React from 'react';
import { Typography } from '@mui/material';
import './style/productPolitics.css';

const ProductPolitics = ({item}) => {

    
  return (
    <div>
      <div style={{paddingLeft: '2rem', paddingRight: '2rem', paddingTop: '1rem'}}>
        <Typography sx={{color: '#607D8B', fontWeight: '700', paddingBottom: '0.2rem', fontSize: '1.3rem' }}>¿Qué ofrece este lugar?</Typography>
        <hr  className='hr'/>       
      </div>
      <div className='superPoliticsContainer '>
          <div className='particularContainer'>
          <Typography sx={{color: '#607D8B', fontWeight: '700', paddingBottom: '0.2rem', fontSize: '1.1rem' }}>Normas de la casa</Typography>
            {item.politicas.map((item) => 
            item.titulo === 'Normas de la casa' && 
            <div>
              <Typography sx={{color: '#263238', fontSize: '0.8rem', paddingTop: '0.5rem', paddingBottom: '0.5rem'}}>{item.descripcion}</Typography>
            </div>
            )}
          </div>

          <div className='particularContainer'>
          <Typography sx={{color: '#607D8B', fontWeight: '700', paddingBottom: '0.2rem', fontSize: '1.1rem' }}>Salud y seguridad</Typography>
            {item.politicas.map((item) => 
            item.titulo === 'Salud y seguridad' && 
            <div>
              <Typography sx={{color: '#263238', fontSize: '0.8rem', paddingTop: '0.5rem', paddingBottom: '0.5rem'}}>{item.descripcion}</Typography>
            </div>
            )}
          </div>
      
          <div className='particularContainer'>
          <Typography sx={{color: '#607D8B', fontWeight: '700', paddingBottom: '0.2rem', fontSize: '1.1rem' }}>Politicas de cancelación</Typography>
            {item.politicas.map((item) => 
            item.titulo === 'Politicas de cancelacion' && 
            <div>
              <Typography sx={{color: '#263238', fontSize: '0.8rem', paddingTop: '0.5rem', paddingBottom: '0.5rem'}}>{item.descripcion}</Typography>
            </div>
            )}
       </div>
      </div>       
    </div>
  )

}

export default ProductPolitics