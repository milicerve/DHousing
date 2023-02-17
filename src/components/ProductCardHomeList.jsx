import { Box, Grid, Typography, Stack, Alert } from '@mui/material'
import React from 'react'
import ProductCardHome from './ProductCardHome'
import './style/productCardHome.css';
import useFetch from '../hooks/useFetch'
import Spinner from './Spinner';

const ProductCardHomeList = () => {

  const urlBase = 'http://ec2-3-19-211-226.us-east-2.compute.amazonaws.com:8080'
  const url = urlBase + '/producto' 

  const [dataInfo, err, isLoaded] = useFetch(url);


  return (
    <>
    <div className='productListContainer'>
    <Box sx={{margin: '10px'}} className='recomendationContainer'>
          <Typography 
                    color='#607D8B'
                    variant='h6' 
                    sx={{fontWeight: 'bold'}} 
                    > 
                    Recomendaciones
          </Typography>
      </Box>
      {isLoaded === false 
      ? <Spinner />
      : [(err === 500 || err === 403 || err === 400)
        ? <Stack spacing={2}>
            <Alert severity="error" sx={{alignItems:'center'}}>No se han podido cargar los datos, intenteló nuevamente.</Alert>
          </Stack>
        : <Grid container sx={{marginBottom: '80px'}}>
            {dataInfo.map((item) =>
            <ProductCardHome 
            item = {item} 
            key = {item.id}/>
            )}
          </Grid>
        ]
      }
    </div>
    </>
  )
}

export default ProductCardHomeList
