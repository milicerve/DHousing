import { Grid, Stack, Alert, Box } from '@mui/material'
import React from 'react'
import ProductCardHome from './ProductCardHome'
import './style/productCardHome.css'
import useFetch from '../hooks/useFetch'
import Spinner from '../components/Spinner';

const ProductCardCategoryList = (id) => {

  const urlBase = 'http://ec2-3-19-211-226.us-east-2.compute.amazonaws.com:8080'
  const url = urlBase + '/producto/findByCategoria/' + id.item

  const [dataInfo, err, isLoaded] = useFetch(url);

  return (
    <>
    <div className='productListContainer'>
      {/* <Typography style={{marginTop: '6rem'}}>Nuestra sección de {id.categoria} para vos</Typography> */}
      {isLoaded === false 
      ? <Box sx={{widht: '100vh', height: '100vh', display:'flex', justifyContent: 'center', alignItems:'center'}}>
          <Spinner/>
        </Box>
      : [(err === 500 || err === 403 || err === 400)
        ? <Stack spacing={2} sx={{marginTop:'110px'}}>
            <Alert severity="error" sx={{alignItems:'center'}}>No se han podido cargar los datos, intenteló nuevamente.</Alert>
          </Stack>
        : <Grid container sx={{marginTop:'6rem', paddingBottom:'3rem'}}>
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

export default ProductCardCategoryList
