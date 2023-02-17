import { Card, Grid, CardMedia, Typography } from '@mui/material'
import React from 'react'
import './style/cardCategoryHome.css';

const CardCategoryHome = ({ item }) => {

  return (
    <>
    <Grid item xs={12} sm={6} md={3} >
    <Card sx={{margin: '10px'}}  >
          <CardMedia 
            component="img"  
            height="100%"
            image={`/assets/img/${item.product.image}`} 
            alt= {item.product.category} 
            className='cardCategory'
          >
          </CardMedia>
          <Typography className='categoryTitle' sx={{fontWeight: 'bold'}} >{item.product.category}</Typography>
          <Typography className='total'>{item.product.total} {item.product.category.toLowerCase()}</Typography>
        </Card>
    </Grid>
    </>
  )
}

export default CardCategoryHome