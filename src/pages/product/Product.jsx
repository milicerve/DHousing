import React from 'react'
import ProductLocation from '../../components/ProductLocation'
import ProductDescriptionFeature from '../../components/ProductDescriptionFeature'
import { useParams } from 'react-router-dom'
import GalleryPhotos from '../../components/GalleryPhotos'
import Calendario from '../../components/Calendario'
import ProductPolitics from '../../components/ProductPolitics'
import FavoriteButton from '../../components/FavoriteButton';
import ProductHeader from '../../components/ProductHeader'
import useFetch from '../../hooks/useFetch'
import Spinner from '../../components/Spinner';
import { Stack, Alert, Box} from '@mui/material'

const Product = () => {

  const { id } = useParams()

  //const product = dataProduct.find(item => item.id === id)

  const urlBase = 'http://ec2-3-19-211-226.us-east-2.compute.amazonaws.com:8080'
  const url = urlBase + "/producto/" + id;  

  const [dataInfo, err, isLoaded] = useFetch(url);


  return (
    <>
    {isLoaded === false 
      ? <Box sx={{widht: '100vh', height: '100vh', display:'flex', justifyContent: 'center', alignItems:'center'}}>
          <Spinner/>
        </Box>
      : [(err === 500 || err === 403 || err === 400)
        ? <Stack spacing={2} sx={{marginTop:'110px'}}>
            <Alert severity="error" sx={{alignItems:'center'}}>No se han podido cargar los datos, intenteló nuevamente.</Alert>
          </Stack>
        : <div>
            <>
            <ProductHeader
            item = {dataInfo} 
            key = {dataInfo.id}/>
            <ProductLocation
            item = {dataInfo} 
            key = {dataInfo.id}/>
            <FavoriteButton />
            <GalleryPhotos
            item = {dataInfo} 
            key = {dataInfo.id}/>
            <ProductDescriptionFeature
            item = {dataInfo}  
            index = {dataInfo.id}/>
            <Calendario
            item = {dataInfo}
            key = {dataInfo.id}/>
            <ProductPolitics
            item = {dataInfo} 
            key = {dataInfo.id}/>
            </>
          </div>
      ]
    }
    </>
  )
}

export default Product

