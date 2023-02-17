import React from 'react'
import { Grid, Box, Typography, CardMedia, Card, Stack, Alert } from '@mui/material'
import './style/cardCategoryHome.css';
import useFetch from '../hooks/useFetch'
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';

const CardCategoryHomeList = () => {

  const navigate = useNavigate();

  const urlBase = 'http://ec2-3-19-211-226.us-east-2.compute.amazonaws.com:8080'
  const url = urlBase + '/categorias' 

  const [dataInfo, err, isLoaded] = useFetch(url);

  const clickApart = () => {
    navigate(`/producto/findByCategoria/${1}`)
  }

  const clickHoteles = () => {
    navigate(`/producto/findByCategoria/${2}`)
  }
  
  const clickCabañas = () => {
    navigate(`/producto/findByCategoria/${3}`)
  }

  const clickHostels = () => {
    navigate(`/producto/findByCategoria/${4}`)
  }

  return (
    <>
    <Box className='box'>
      <div className='searchCategoryContainer'>
      <Typography 
        color='#607D8B'
        variant='h6' 
        sx={{fontWeight: 'bold', padding: '10px'}} 
      >
        Buscar por tipo de alojamientos
      </Typography>
      </div>
    </Box>
    {isLoaded === false 
    ? <Spinner />
    : [(err === 500 || err === 403 || err === 400)
      ? <Stack spacing={2}>
          <Alert severity="error" sx={{alignItems:'center'}}>No se han podido cargar los datos, intenteló nuevamente.</Alert>
        </Stack>
      : <Grid container className='list'>
          <Grid item xs={12} sm={6} md={3} >
            {dataInfo.filter(item => item.id === 1).map((item, i) =>
              <Card key={i} sx={{margin: '10px'}} onClick={clickApart} >
                <CardMedia 
                  component="img"  
                  height="100%"
                  image={item.urlImg} 
                  alt= {item.titulo} 
                  className='cardCategory'
                >
                </CardMedia>
                <Typography className='categoryTitle' sx={{fontWeight: 'bold'}} >{item.titulo}</Typography>
                <Typography className='total'>901.100 {item.titulo.toLowerCase()}</Typography>
              </Card>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={3} >
            {dataInfo.filter(item => item.id === 2).map((item, i) =>
              <Card key={i} sx={{margin: '10px'}} onClick={clickHoteles} >
                <CardMedia 
                  component="img"  
                  height="100%"
                  image={item.urlImg} 
                  alt= {item.titulo} 
                  className='cardCategory'
                >
                </CardMedia>
                <Typography className='categoryTitle' sx={{fontWeight: 'bold'}} >{item.titulo}</Typography>
                <Typography className='total'>802.025 {item.titulo.toLowerCase()}</Typography>
              </Card>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={3} >
            {dataInfo.filter(item => item.id === 3).map((item, i) => 
              <Card key={i} sx={{margin: '10px'}} onClick={clickCabañas} >
                <CardMedia 
                  component="img"  
                  height="100%"
                  image={item.urlImg} 
                  alt= {item.titulo} 
                  className='cardCategory'
                >
                </CardMedia>
                <Typography className='categoryTitle' sx={{fontWeight: 'bold'}} >{item.titulo}</Typography>
                <Typography className='total'>135.550 {item.titulo.toLowerCase()}</Typography>
              </Card>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={3} >
            {dataInfo.filter(item => item.id === 4).map((item, i) => 
              <Card key={i} sx={{margin: '10px'}} onClick={clickHostels} >
                <CardMedia 
                  component="img"  
                  height="100%"
                  image={item.urlImg} 
                  alt= {item.titulo} 
                  className='cardCategory'
                >
                </CardMedia>
                <Typography className='categoryTitle' sx={{fontWeight: 'bold'}} >{item.titulo}</Typography>
                <Typography className='total'>210.350 {item.titulo.toLowerCase()}</Typography>
              </Card>
            )}
          </Grid>
        </Grid>  
      ]
    }
    </>
  )
}


export default CardCategoryHomeList