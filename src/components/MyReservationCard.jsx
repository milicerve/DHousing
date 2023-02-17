import { Button, Card, CardContent, CardMedia, Typography, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react';
import './style/myReservationCard.css';

export const MyReservationCard = ({item}) => {

    const imagenes = item.producto.imagenes.map((item) => item.urlImg) 
    console.log('imagenes', imagenes)

    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 768px)").matches
      )
    
      useEffect(() => {
        window
        .matchMedia("(min-width: 767px)")
        .addEventListener('change', e => setMatches( e.matches ));
      }, []);

  return (
    <>
    {matches ?
     <Grid item xs={12} sm={12} md={6} >
     <Card  className='card' sx={{position: 'relative', height: '10rem'}}> 
         <CardMedia
                   component="img"
                   height="100%"
                   image={imagenes[0]}
                   alt= {item.producto.titulo}
                   sx={{width:'40%'}} 
                   className='cardMediaContainer'
                   >
         </CardMedia>
         <CardContent display='flex' sx={{position:'relative', width: '100%'}}>
             <Typography sx={{fontSize: '1.5rem', color: '#607D8B'}}> {item.producto.titulo} </Typography>                   
             <div className='myReservationCardDescription'>
                 <Typography sx={{color: '#607D8B'}} > {item.producto.ubicacion}  </Typography>
                 <Typography>{item.fechaIngreso[2]}/{item.fechaIngreso[1]}/{item.fechaIngreso[0]} - {item.fechaEgreso[2]}/{item.fechaEgreso[1]}/{item.fechaEgreso[0]} </Typography>
                 <Typography > No reembolsable </Typography>
             </div>
             <div>
                 <Typography variant='paragraph' sx={{color:'green'}}>Confirmada</Typography>
             </div>
         </CardContent>
     </Card>
     </Grid> :
     <Grid item xs={12} sm={12} md={6} >
     <Card  className='card' sx={{position: 'relative', height: '26rem'}}> 
         <CardMedia
                   component="img"                  
                   image={imagenes[0]}
                   alt= {item.producto.titulo}
                   sx={{width:'40%', width: '100%'}} 
                   className='cardMediaContainer'
                   >
         </CardMedia>
         <div display='flex' style={{position:'relative', width: '100%', paddingLeft: '1rem', marginBottom:'2rem', marginTop: '1rem'}}>
             <Typography sx={{fontSize: '1.5rem', color: '#607D8B'}}> {item.producto.titulo} </Typography>                   
             <div className='myReservationCardDescription'>
                 <Typography sx={{color: '#607D8B'}} > {item.producto.ubicacion}  </Typography>
                 <Typography>{item.fechaIngreso[2]}/{item.fechaIngreso[1]}/{item.fechaIngreso[0]} - {item.fechaEgreso[2]}/{item.fechaEgreso[1]}/{item.fechaEgreso[0]} </Typography>
                 <Typography > No reembolsable </Typography>
             </div>
             <div>
                 <Typography variant='paragraph' sx={{color:'green'}}>Confirmada</Typography>
             </div>
         </div>
     </Card>
 </Grid>

     }
       
    </>
  )
}


export default MyReservationCard