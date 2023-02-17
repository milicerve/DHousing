import React from 'react';
import { Typography } from '@mui/material';
import './style/productPoliticsBooking.css';

const ProductPoliticsBooking = () => {

  return (
    <div>
        <div className='superPoliticsContainerBooking'>
            <Typography sx={{color: '#607D8B', fontWeight: '700', paddingBottom: '0.2rem', fontSize: '1.3rem' }}>Qué tenes que saber</Typography>
            <hr  className='hr'/>
            <div className='politicsContainerBooking'>
              <div className='particularContainerBooking'>
              <Typography sx={{color: '#607D8B', fontWeight: '700', fontSize: '1rem' }}>Normas de la casa</Typography>
              <Typography sx={{color: '#263238', fontSize: '0.8rem', paddingTop: '0.5rem', paddingBottom: '0.5rem'}}>Check-in: 09:30 am</Typography>
              <Typography sx={{color: '#263238', fontSize: '0.8rem', paddingTop: '0.5rem', paddingBottom: '0.5rem'}}>No se permiten niños menores de 8 años</Typography>
              <Typography sx={{color: '#263238', fontSize: '0.8rem', paddingTop: '0.5rem', paddingBottom: '0.5rem'}}>Prohibido ingresar con bebidas alcoholicas</Typography>
              </div>
              <div className='particularContainerBooking'>
              <Typography sx={{color: '#607D8B', fontWeight: '700', fontSize: '1rem' }}>Salud y seguridad</Typography>
              <Typography sx={{color: '#263238', fontSize: '0.8rem', paddingTop: '0.5rem', paddingBottom: '0.5rem'}}>Caja de seguridad</Typography>
              <Typography sx={{color: '#263238', fontSize: '0.8rem', paddingTop: '0.5rem', paddingBottom: '0.5rem'}}>Detector de humo</Typography>
              <Typography sx={{color: '#263238', fontSize: '0.8rem', paddingTop: '0.5rem', paddingBottom: '0.5rem'}}>Seguridad 24hrs</Typography>
              </div>
              <div className='particularContainerBooking'>
              <Typography sx={{color: '#607D8B', fontWeight: '700', fontSize: '1rem' }}>Política de cancelación</Typography>
              <Typography sx={{color: '#263238', fontSize: '0.8rem', paddingTop: '0.5rem', paddingBottom: '0.5rem'}}>Para obtener detalles de nuestras políticas de cancelación agregá las fechas de tu viaje</Typography>
              </div>
            </div>
        </div>
    </div>
  )
}

export default ProductPoliticsBooking
