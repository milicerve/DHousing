import { Avatar, Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWifi, faSnowflake, faDumbbell, faSquareParking, faPersonSwimming, faKitchenSet, faTv, faVault } from '@fortawesome/free-solid-svg-icons'
import WifiIcon from '@mui/icons-material/Wifi';
import PoolIcon from '@mui/icons-material/Pool';
import { useNavigate } from 'react-router-dom';
import './style/productCardHome.css';
import { useState } from 'react';

const ProductCardHome = ( { item } ) => {

  const navigate = useNavigate();

  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  )

  useEffect(() => {
    window
    .matchMedia("(min-width: 767px)")
    .addEventListener('change', e => setMatches( e.matches ));
  }, []);

  const imagenes = item.imagenes.map((item) => item.urlImg)
  const iconos = item.caracteristicas.map((item) => item.icono)

  return (
    <>
    {matches ?
            <Grid item xs={12} sm={12} md={6} >
              <Card  className='card' sx={{position: 'relative'}}> 
                <CardMedia
                          component="img"
                          height="100%"
                          image={imagenes[0]}
                          alt= {item.titulo}
                          sx={{width:'40%'}} 
                          className='cardMediaContainer'
                          >
                </CardMedia>
                <CardContent display='flex' sx={{position:'relative'}}>
                  <div className='calification'>
                    <Avatar sx={{bgcolor:'#263238', borderRadius:'8px', height:'1.8rem', width: '1.8rem', fontSize: '0.8rem', fontWeight: 'bold'}}> {item.puntaje === 0 ? 'new' : item.puntaje*2} </Avatar>
                    <Typography sx={{color: '#263238', fontSize: '0.9rem', fontWeight:'bold'}}>{item.puntaje*2 > 9 ? 'Fantástico': 'Muy Bueno'}</Typography>
                  </div>
                    <Typography className='category' sx={{fontSize: '0.8rem'}}> {item.categoria.titulo} </Typography>
                    <Typography  sx={{fontWeight: 'bold', fontSize:'1.2rem'}} className='productCardHomeTitle'  color={'#263238'}> {item.titulo} </Typography>
                  <div className='location'>
                    <LocationOnIcon sx={{color: '#263238'}} fontSize='small' />
                    <Typography variant='paragraph' > {item.ubicacion} </Typography>
                  </div>
                  <div className='productCardHomeListContainer'>
                    {item.caracteristicas.map((item) => 
                        item.icono === 'faTemperatureArrowDown' && 
                        <div className='feature'>
                          <FontAwesomeIcon icon={faSnowflake} style={{color: '#263238', paddingRight: '0.5rem'}}/>
                        </div>
                    )}

                    {item.caracteristicas.map((item) => 
                        item.icono === 'faDumbbell' && 
                        <div className='feature'>
                          <FontAwesomeIcon icon={faDumbbell} style={{color: '#263238', paddingRight: '0.5rem'}}/>
                        </div>
                    )}

                    {item.caracteristicas.map((item) => 
                        item.icono === 'faSquareParking' && 
                        <div className='feature'>
                          <FontAwesomeIcon icon={faSquareParking} style={{color: '#263238', paddingRight: '0.5rem'}}/>
                        </div>
                    )}

                    {item.caracteristicas.map((item) => 
                        item.icono === 'faWaterLadder' && 
                        <div className='feature'>
                          <FontAwesomeIcon icon={faPersonSwimming} style={{color: '#263238', paddingRight: '0.5rem'}}/>
                        </div>
                    )}

                    {item.caracteristicas.map((item) => 
                        item.icono === 'faWifi' && 
                        <div className='feature'>
                          <FontAwesomeIcon icon={faWifi} style={{color: '#263238', paddingRight: '0.5rem'}}/>
                        </div>
                    )}

                    {item.caracteristicas.map((item) => 
                        item.icono === 'faTv' && 
                        <div className='feature'>
                          <FontAwesomeIcon icon={faTv} style={{color: '#263238', paddingRight: '0.5rem'}}/>
                        </div>
                    )}
                  </div>
                  <Typography className='description' sx={{fontSize: '0.8rem'}} > {item.descripcion} </Typography>
                  <Button 
                        variant='contained' 
                        sx={{ marginTop: '10px', 
                        width: '100%', 
                        color: 'white', 
                        textTransform: 'none',
                        fontWeight: 'bold',
                        }}
                        onClick={()=> navigate(`/producto/${item.id}`)}
                        className='detailsButton'
                        > 
                        Ver más
                  </Button>
                </CardContent>
              </Card>
            </Grid>  
            : 
            <Grid item xs={12} sm={6} md={3} className='grid' >
              <Card sx={{margin: '10px'}}  >
                    <CardMedia 
                      component="img"  
                      height="100%"
                      image={imagenes[0]} 
                      alt= {item.titulo} 
                      className='cardCategory'
                    >
                    </CardMedia>
                    <div className='calification'>
                      <Avatar sx={{bgcolor:'#263238', borderRadius:'8px', height:'1.8rem', width: '1.8rem', fontSize: '0.9rem', fontWeight: 'bold'}}>{item.puntaje === 0 ? 'new' : item.puntaje*2}</Avatar>
                      <Typography sx={{color: '#263238', fontSize: '0.9rem', fontWeight:'bold'}}>{item.puntaje*2 > 9 ? 'Fantástico': 'Muy Bueno'}</Typography>
                    </div>
                    <div className='mobileCardContent'>
                      <Typography className='category' sx={{fontSize: '0.8rem'}}> {item.categoria.titulo} </Typography>
                      <Typography  sx={{fontWeight: 'bold', fontSize:'1.2rem'}} className='productCardHomeTitle'  color={'#263238'}> {item.titulo} </Typography>
                      <LocationOnIcon sx={{color: '#263238'}} fontSize='small' />
                      <Typography variant='paragraph' > {item.ubicacion} </Typography>
                      <div className='wifiPool'>
                      <WifiIcon sx={{color: '#263238'}} fontSize='small' />
                      <PoolIcon sx={{color: '#263238'}} fontSize='small' />
                      </div>
                      <Typography className='description' sx={{fontSize: '0.8rem'}} > {item.descripcion} </Typography>
                      <Button 
                            variant='contained' 
                            sx={{ marginTop: '10px', 
                            width: '100%', 
                            color: 'white', 
                            textTransform: 'none',
                            fontWeight: 'bold',
                            }}
                            onClick={()=> navigate(`/producto/${item.id}`)}
                            className='detailsButton'
                            > 
                            Ver más
                      </Button>
                    </div>
                  </Card>
              </Grid>         
    }
      
    </>
  )
}

export default ProductCardHome

