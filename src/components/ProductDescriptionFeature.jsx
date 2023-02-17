import { Typography } from '@mui/material'
import './style/productDescriptionFeature.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWifi, faSnowflake, faDumbbell, faSquareParking, faPersonSwimming, faKitchenSet, faTv, faVault } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

const ProductDescriptionFeature = ({ item }) => {

    const city = item.ciudad.nombre;
    const cityIndex = city.indexOf(',');
    
  return (
    <>
    <div className='superContainer'>
    <div className='descriptionContainer'>
        <Typography sx={{color: '#607D8B', fontWeight: '700', paddingBottom: '1rem', fontSize: '1.3rem' }}> Alojate en el corazón de la {city.substring(0, cityIndex)}</Typography>
        <Typography sx={{color: '#263238', fontSize: '0.8rem'}}> {item.descripcion}</Typography>
    </div>
     <div className='descriptionContainer'>
        <Typography sx={{color: '#607D8B', fontWeight: '700', paddingBottom: '0.2rem', fontSize: '1.3rem' }}>¿Qué ofrece este lugar?</Typography>
        <hr  className='hr'/>       
        <div className='listContainer'>
        {item.caracteristicas.map((item) => 
            item.icono === 'faTemperatureArrowDown' && 
            <div className='feature'>
              <FontAwesomeIcon icon={faSnowflake} style={{color: '#607D8B', paddingRight: '0.5rem'}}/>
              <Typography sx={{color: '#263238', fontSize: '0.8rem'}}> {item.titulo} </Typography>
            </div>
        )}

        {item.caracteristicas.map((item) => 
            item.icono === 'faDumbbell' && 
            <div className='feature'>
              <FontAwesomeIcon icon={faDumbbell} style={{color: '#607D8B', paddingRight: '0.5rem'}}/>
              <Typography sx={{color: '#263238', fontSize: '0.8rem'}}> {item.titulo} </Typography>
            </div>
        )}

        {item.caracteristicas.map((item) => 
            item.icono === 'faSquareParking' && 
            <div className='feature'>
              <FontAwesomeIcon icon={faSquareParking} style={{color: '#607D8B', paddingRight: '0.5rem'}}/>
              <Typography sx={{color: '#263238', fontSize: '0.8rem'}}> {item.titulo} </Typography>
            </div>
        )}

        {item.caracteristicas.map((item) => 
            item.icono === 'faWaterLadder' && 
            <div className='feature'>
              <FontAwesomeIcon icon={faPersonSwimming} style={{color: '#607D8B', paddingRight: '0.5rem'}}/>
              <Typography sx={{color: '#263238', fontSize: '0.8rem'}}> {item.titulo} </Typography>
            </div>
        )}

        {item.caracteristicas.map((item) => 
            item.icono === 'faWifi' && 
            <div className='feature'>
              <FontAwesomeIcon icon={faWifi} style={{color: '#607D8B', paddingRight: '0.5rem'}}/>
              <Typography sx={{color: '#263238', fontSize: '0.8rem'}}> {item.titulo} </Typography>
            </div>
        )}

        {item.caracteristicas.map((item) => 
            item.icono === 'faKitchenSet' && 
            <div className='feature'>
              <FontAwesomeIcon icon={faKitchenSet} style={{color: '#607D8B', paddingRight: '0.5rem'}}/>
              <Typography sx={{color: '#263238', fontSize: '0.8rem'}}> {item.titulo} </Typography>
            </div>
        )}

        {item.caracteristicas.map((item) => 
            item.icono === 'faTv' && 
            <div className='feature'>
              <FontAwesomeIcon icon={faTv} style={{color: '#607D8B', paddingRight: '0.5rem'}}/>
              <Typography sx={{color: '#263238', fontSize: '0.8rem'}}> {item.titulo} </Typography>
            </div>
        )}

        {/* {item.caracteristicas.map((item) => 
            item.icono === 'faWifiSlash' && 
            <div className='feature'>
              <FontAwesomeIcon icon={faWifiSlash} style={{color: '#607D8B', paddingRight: '0.5rem'}}/>
              <Typography sx={{color: '#263238', fontSize: '0.8rem'}}> {item.titulo} </Typography>
            </div>
        )} */}

        {item.caracteristicas.map((item) => 
            item.icono === 'faVault' && 
            <div className='feature'>
              <FontAwesomeIcon icon={faVault} style={{color: '#607D8B', paddingRight: '0.5rem'}}/>
              <Typography sx={{color: '#263238', fontSize: '0.8rem'}}> {item.titulo} </Typography>
            </div>
        )}
        </div>
    </div> 
    </div>
    </>
  )
}

export default ProductDescriptionFeature