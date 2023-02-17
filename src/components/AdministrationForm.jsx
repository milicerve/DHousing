import { Button, Typography, IconButton, Box, TextField, Autocomplete, FormControl, FormGroup, FormControlLabel, Checkbox, Alert, Stack } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import './style/administrationForm.css';
import useFetch from '../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './style/administrationFormPolitics.css';
import './style/administrationFormCharacters.css';
import './style/administrationFormDatos.css';
import './style/administrationFormImages.css';

export const AdministrationForm = () => {

  //----------------- Ciudad -------------------
  const [valueCiudad, setValueCiudad] = useState(null)

  const urlBaseCity = 'http://ec2-3-19-211-226.us-east-2.compute.amazonaws.com:8080'
  const urlCity = urlBaseCity + '/ciudades';  
    
  const [dataInfoCity] = useFetch(urlCity);
  console.log('city:', dataInfoCity)

  //----------------- Categoria -------------------
  const [valueCategoria, setValueCategoria] = useState(null)

  const urlBaseCategory = 'http://ec2-3-19-211-226.us-east-2.compute.amazonaws.com:8080'
  const urlCategory = urlBaseCategory + '/categorias';  
    
  const [dataInfoCategory] = useFetch(urlCategory);
  console.log('categorias:', dataInfoCategory)

  //----------------- Caracteristicas -------------------
  const urlBaseCaracteristica = 'http://ec2-3-19-211-226.us-east-2.compute.amazonaws.com:8080'
  const urlCaracteristica = urlBaseCaracteristica + '/caracteristicas';  

  const [dataInfoCharacter] = useFetch(urlCaracteristica);
  const [charactersChecked, setCharactersChecked] = useState([])
  const [politics, setPolitics] = useState([])

  const handleCheckbox = (event, getter, setter) => {
    if (event.target.checked){
      setter([...getter, {id: event.target.id }])
    } else {
      const filterDelete = getter.filter((item) => item.id !== event.target.id)

      setter([...filterDelete])

    }
  }

  console.log({charactersChecked})


  //----------------- Politicas -------------------
  const urlBasePoliticas = 'http://ec2-3-19-211-226.us-east-2.compute.amazonaws.com:8080'
  const urlPoliticas = urlBasePoliticas + '/politicas';  
    
  const [dataInfoPoliticas] = useFetch(urlPoliticas);


  console.log('politicas:', dataInfoPoliticas)

  const navigate = useNavigate()
  
  //----------------- Imagenes -------------------
  const [urlList, setUrlList] = useState([])
  console.log('url', urlList)

  const [urlInput, setUrlInput] = useState([])

  const handleAdd = () =>{
    setUrlList([...urlList, {titulo: '', urlImg: urlInput}])
  }

  const handleChange = event => {
    setUrlInput(event.target.value);
  };

  const handleDelete = (i) =>{
    const filterDelete = urlList.filter((item) => item !== i)
    setUrlList(filterDelete)
  }

  //----------------- POST -------------------

  const [openWarning, setOpenWarning] = useState(false)
    
    function closeWarning () {
        setOpenWarning(false)
        }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const userToken = JSON.parse(localStorage.getItem("token"))

    const onSubmit=(data) => {
      fetch('http://ec2-3-19-211-226.us-east-2.compute.amazonaws.com:8080/producto', {
          method: 'POST',
          body: JSON.stringify({
            titulo: data.title,
            ubicacion: data.direction,
            descripcion: data.description,
            disponibilidad: true,
            categoria: {
              id: valueCategoria
            },
            ciudad: {
              id: valueCiudad
            }, 
            imagenes: urlList,
            caracteristicas: charactersChecked,
            politicas: politics           
          }),
          headers: {
              'Content-type': 'application/json; charset=UTF-8',
              'Authorization': `Bearer ${userToken}`
          },
        })
        .then((response) => {
          if(response.ok){
              response.json()
              .then((data) => {
                  console.log('data', data);
                  navigate('/createdProductSucces')
              })
              .catch((err) => {
                  console.log(err.message);
                  setOpenWarning(true)
                  setTimeout(closeWarning, 3000)
              })
          } else{
              setOpenWarning(true)
              setTimeout(closeWarning, 3000)
          }
      })
    };
   


  return (
    <div className='administrationFormContainer'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='administrationFormTitleBox'>
          <Typography sx={{fontWeight: '700', color: '#607D8B', padding: '1rem', fontSize: '1.2rem'}} className='administrationFormTyp'> Agregar datos </Typography>
        </div>
        <Box className='administrationFormDatosBox'>
        <div className='administrationFormDuoContainer'>
        <Box className='administrationFormInput'>
          <Typography sx={{fontSize: '0.9rem', color: '#607D8B'}}> Nombre de la propiedad </Typography>
          <TextField
                    name='title'
                    type={'title'} 
                    placeholder='Hermirage Hotel'
                    className='textfieldAdminstration'
                    {...register('title', {
                      required: true
                    }) }
                    />
                    {errors.title?.type === 'required' && <Typography sx={{color:'red', fontSize: '0.8rem'}}>Este campo es obligatorio</Typography>}
        </Box>

        <Box className='administrationFormInput'>
          <Typography sx={{fontSize: '0.9rem', color: '#607D8B'}}> Categoria </Typography>
          <Autocomplete 
                          variant='contained'
                          size= 'small'
                          sx= {{width: '100%', color: '#263238', height:'35px'}}
                          options={dataInfoCategory.map((item, index) => item )}
                          getOptionLabel={(option) => option.titulo}
                          onChange= {(event, newValue) => {
                              setValueCategoria(newValue.id)
                              console.log('eventCategoria', newValue.id);
                          }} 
                          renderInput={(params) => (
                              <TextField
                              type='category'
                              name='category'
                              {...params}
                                  placeholder="Hotel"
                                  {...register('category', {
                                    required: true
                                  })}
                              />
                          )}
                      />
                      {errors.category?.type === 'required' && <Typography sx={{color:'red', fontSize: '0.8rem', marginTop:'0.3rem'}}>Este campo es obligatorio</Typography>}

        </Box>
        </div>

        <div className='administrationFormDuoContainer'>
        <Box className='administrationFormInput'>
          <Typography sx={{fontSize: '0.9rem', color: '#607D8B'}}> Dirección </Typography>
          <TextField  
                    name='direction'
                    type={'direction'}
                    placeholder='Av Colón 1643' 
                    className='textfieldAdminstration'
                    {...register('direction', {
                      required: true
                    })}
                    />
                    {errors.direction?.type === 'required' && <Typography sx={{color:'red', fontSize: '0.8rem'}}>Este campo es obligatorio</Typography>}
        </Box>

        <Box className='administrationFormInput'>
          <Typography sx={{fontSize: '0.9rem', color: '#607D8B'}}> Ciudad </Typography>
          <Autocomplete 
                          variant='contained'
                          size= 'small'
                          sx= {{width: '100%', color: '#263238', height:'35px'}}
                          options={dataInfoCity.map((item, index) => item )}
                          getOptionLabel={(option) => option.nombre}
                          onChange= {(event, newValue) => {
                            setValueCiudad(newValue.id)
                              console.log('eventCiudad', newValue.id);
                          }} 
                          renderInput={(params) => (
                            <TextField
                            {...params}
                                placeholder="Ciudad"
                                {...register('city', {
                                  required: true
                                })}
                            />
                        )}
                    />
                    {errors.city?.type === 'required' && <Typography sx={{color:'red', fontSize: '0.8rem', marginTop:'0.3rem'}}>Este campo es obligatorio</Typography>}
      </Box>
        </div>
        <Box className='administrationFormInput'>
          <Typography sx={{fontSize: '0.9rem', color: '#607D8B'}}> Descripción </Typography>
          <TextField  
                    name='description'
                    type={'description'}
                    multiline rows={4}
                    placeholder='Escribir aquí' 
                    className='textfieldAdminstrationDescription'
                    {...register('description', {
                      required: true
                    })}
                    />
                    {errors.description?.type === 'required' && <Typography sx={{color:'red', fontSize: '0.8rem'}}>Este campo es obligatorio</Typography>}

        </Box>
      </Box>
      <div className='administrationFormTitleBox'>
        <Typography sx={{fontWeight: '700', color: '#607D8B', padding: '1rem', fontSize: '1.2rem'}} className='administrationFormTyp'> Cargar características del producto </Typography>
      </div>
      <Box className='administrationFormCharactersBox'>
      <Box sx={{ display: 'flex' }}>
        <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
          <FormGroup className='administrationFormCharactersCheck'>
            {dataInfoCharacter.map((item, i) => (
              <FormControlLabel
                key={i}
                control={<Checkbox id={item.id} onChange={(event) => handleCheckbox(event, charactersChecked, setCharactersChecked)}/>} 
                label= {item.titulo}
                sx={{fontSize: '0.7rem', color: '#607D8B'}}
                className='administrationFormCharactersCheckLabel' />  ))} 
          </FormGroup>  
        </FormControl>
      </Box>      
      </Box>
      <div className='administrationFormTitleBox'>
        <Typography sx={{fontWeight: '700', color: '#607D8B', padding: '1rem', fontSize: '1.2rem'}} className='administrationFormTyp'> Políticas del producto </Typography>
      </div>

      <div className='administrationFormaPoliticsContainer'>
        <div className='administrationFormaPoliticsContainerIndividual'>
          <Typography sx={{color: '#607D8B', fontWeight: '700', paddingBottom: '0.2rem', fontSize: '1.1rem' }}>Normas de la casa</Typography>
          <hr />
          <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
            <FormGroup className='administrationFormPoliticsCheck'>
              {dataInfoPoliticas.map((item, i) =>
                                                item.titulo === 'Normas de la casa' &&
                                                <FormControlLabel
                                                key={i}
                                                control={<Checkbox id={item.id} onChange={(event) => handleCheckbox(event, politics, setPolitics)}/>} 
                                                label= {item.descripcion}
                                                sx={{fontSize: '0.7rem', color: '#607D8B'}}
                                                className='administrationFormPoliticsCheckLabel' />  )} 
            </FormGroup>  
          </FormControl>
        </div>
        <div className='administrationFormaPoliticsContainerIndividual'>
          <Typography sx={{color: '#607D8B', fontWeight: '700', paddingBottom: '0.2rem', fontSize: '1.1rem' }}>Salud y seguridad</Typography>
          <hr />
          <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
            <FormGroup className='administrationFormPoliticsCheck'>
              {dataInfoPoliticas.map((item, i) =>
                                                item.titulo === 'Salud y seguridad' &&
                                                <FormControlLabel key={i} control={<Checkbox id={item.id} onChange={(event) => handleCheckbox(event, politics, setPolitics)}/>} 
                                                label= {item.descripcion}
                                                sx={{fontSize: '0.3rem', color: '#607D8B'}}
                                                className='administrationFormPoliticsCheckLabel' />  )} 
          </FormGroup>  
          </FormControl>
        </div>
        <div className='administrationFormaPoliticsContainerIndividual'>
          <Typography sx={{color: '#607D8B', fontWeight: '700', paddingBottom: '0.2rem', fontSize: '1.1rem' }}>Politicas de cancelación</Typography>
          <hr />
          <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
            <FormGroup className='administrationFormPoliticsCheck'>
              {dataInfoPoliticas.map((item, i) =>
                                                item.titulo === 'Politicas de cancelacion' &&
                                                <FormControlLabel key={i} control={<Checkbox id={item.id} onChange={(event) => handleCheckbox(event, politics, setPolitics)}/>} 
                                                label= {item.descripcion}
                                                sx={{fontSize: '0.7rem', color: '#607D8B'}}
                                                className='administrationFormPoliticsCheckLabel' />  )} 
            </FormGroup>  
          </FormControl>
        </div>
      </div>
        <div className='administrationFormTitleBox'>
          <Typography sx={{fontWeight: '700', color: '#607D8B', padding: '1rem', fontSize: '1.2rem'}} className='administrationFormTyp'> Cargar imágenes </Typography>
        </div>
        <div>
          <Box className='administrationFormImagesContainer'>
            <TextField
                      name='url'
                      type={'url'} 
                      placeholder='Insertar https://'
                      className='administrationFormImagesTextField'
                      onChange={handleChange}
                      />
              <IconButton aria-label="delete" className='administrationFormImagesButtonAdd'  onClick={() => handleAdd()}>
                <AddIcon fontSize='large'/>
              </IconButton>
          </Box>
          <div className='administrationFormImagesUrlList'>
              {urlList.map((item, i) => 
              <div key={i} className='administrationFormImagesUrlDelete'>
                <Button  variant="outlined" sx={{textTransform: 'none', display: 'flex', justifyContent:'space-between', color: '#607D8B', borderColor:'#607D8B'}} className='administrationFormImagesButtonDelete'>
                  <Typography > {item.urlImg} </Typography>
                  <DeleteIcon  onClick={() => handleDelete(item)}/>
                </Button>
              </div> )}
          </div>        
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
        <Button 
              variant='contained' 
              type='submit'
              sx={{ margin: '2rem', 
                    color: 'white', 
                    textTransform: 'none',
                    fontWeight: 'bold',
                    width: '40%',
                    height: '2.5rem',
                    bgcolor: '#607D8B'   }}
                    > 
                    Crear 
        </Button>
        </div>
      </form>
      {openWarning && 
          <Stack spacing={2} sx={{alignItems:'center'}}>
          <Alert severity="error" sx={{alignItems:'center'}}>Lamentablemente no ha podido completar la carga de su producto. Por favor intente más tarde.</Alert>
      </Stack>
    }
    </div>
  )
}



export default AdministrationForm