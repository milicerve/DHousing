import { Box, Button, IconButton, TextField, Typography, Alert, Stack } from '@mui/material';
import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import {useNavigate} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './style/loginCreateAccount.css'

const CreateAcountForm = () => {

  const navigate = useNavigate();

  const [openWarning, setOpenWarning] = useState(false)

  const {
    register,
    getValues, 
    watch,
    formState: { errors },
    handleSubmit
  } = useForm({
    mode:'all'
  });

  //console.log( 'errors', errors )
  function closeWarning () {
    setOpenWarning(false)
  }

  const onSubmit=(data) =>{
    fetch('http://ec2-3-19-211-226.us-east-2.compute.amazonaws.com:8080/usuario', {
        method: 'POST',
        body: JSON.stringify({
            nombre: data.name,
            apellido: data.lastName,
            email: data.email,
            password: data.password,
            rol: {id: 1}
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => {
          if(response.ok){
              response.json()
              .then((data) => {
                //console.log(data);
                //localStorage.setItem("token", JSON.stringify(data.jwt));
                navigate('/createAccountOk')
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
  }
  
  return (
    <div>
        <IconButton 
        aria-label='CloseIcon' 
        className='loginCreateAccount-close'
        onClick={()=> navigate('/')}
        >
          <CloseIcon />
        </IconButton>
        <form onSubmit={handleSubmit(onSubmit)}>
              <Box className='loginCreateAccount-formBox'>
              <Typography variant='h6' className='loginCreateAccount-title' fontWeight={'bold'} sx={{ marginBottom:'5px' }}> Crear cuenta </Typography>
              <Box className='loginCreateAccount-formSingup'>
                <Box className='loginCreateAccount-inputName'>
                  <Typography className='loginCreateAccount-formTypography'> Nombre </Typography>
                  <TextField
                            size='small'
                            name='name'
                            type={'name'}
                            placeholder='Escribe tu nombre'
                            className='loginCreateAccount-textfield'
                            //value={nameValue}
                            //onChange={(newValue) => setNameValue(newValue.target.value)}
                            {...register('name', {
                              required: 'El campo obligatorio'                      
                              })}
                            error={!!errors?.name}
                            helperText={errors?.name? errors.name.message : null}
                            >
                  </TextField>
                </Box>
                <Box className='loginCreateAccount-inputLastName'>
                  <Typography className='loginCreateAccount-formTypography'> Apellido </Typography>
                  <TextField
                            size='small'
                            name='lastName'
                            type={'lastName'}
                            placeholder='Escribe tu apellido'
                            className='loginCreateAccount-textfield'
                            //value={lastNameValue}
                            //onChange={(newValue) => setLastNameValue(newValue.target.value)}
                            {...register('lastName', {
                              required: 'El campo obligatorio'                      
                              })}
                            error={!!errors?.lastName}
                            helperText={errors?.lastName? errors.lastName.message : null}
                            >
                  </TextField>
                </Box>
                </Box>
                
                <Box className='loginCreateAccount-input'>
                  <Typography className='loginCreateAccount-formTypography'> Correo electrónico </Typography>
                  <TextField
                            size='small' 
                            name='email'
                            type={'email'} 
                            placeholder='Escribe tu correo electrónico'
                            className='loginCreateAccount-textfield'
                            {...register('email', {
                              required: 'El campo es obligatorio',
                              pattern:{
                              value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                              message: 'El email debe ser válido'
                              } 
                            })}
                            error={!!errors?.email}
                            helperText={errors?.email? errors.email.message : null}
                            >
                  </TextField>
                </Box>
                <Box className='loginCreateAccount-input'>
                  <Typography className='loginCreateAccount-formTypography'> Contraseña </Typography>
                  <TextField
                            size='small'  
                            name='password'
                            type={'password'} 
                            placeholder='Escribe tu contraseña' 
                            className='loginCreateAccount-textfield'
                            {...register('password', {
                              required: 'El campo obligatorio',
                              minLength: {
                                value: 6,
                                message: 'La contraseña debe contener al menos 6 carácteres.' 
                            }                       
                              })}
                            error={!!errors?.password}
                            helperText={errors?.password? errors.password.message : null}
                            >
                    </TextField>
                </Box>
                <Box className='loginCreateAccount-input'>
                    <Typography className='loginCreateAccount-formTypography'> Confirmar contraseña </Typography>
                    <TextField
                              size='small'  
                              name='confirmPassword'
                              type={'password'}
                              placeholder='Re-escribe tu contraseña' 
                              className='loginCreateAccount-textfield'
                              {...register('confirmPassword', {
                                required: 'El campo obligatorio',
                                minLength: {
                                  value: 6,
                                  message: 'La contraseña debe contener al menos 6 carácteres.' 
                              }                       
                                })}
                              >
                    </TextField>

                    {watch("confirmPassword") !== watch("password") && getValues("confirmPassword") ? (
                    <Typography variant='loginCreateAccount-errors'> Las contraseñas no coinciden </Typography>) : null
                  }
                </Box>
                <Button 
                      variant='contained' 
                      type='submit'
                      sx={{ marginTop: '10px', 
                            marginLeft:'10px', 
                            width: '10rem', 
                            color: 'white', 
                            textTransform: 'none',
                            fontWeight: 'bold'   }}
                      > 
                    Crear cuenta 
                </Button>
                <Box 
                    display="flex" 
                    padding={2} 
                    alignItems={'center'}
                    marginBottom={3}
                    >
                    <Typography className='loginCreateAccount-formTypography'> ¿Ya tienes cuenta? </Typography>
                    <Button sx={{fontWeight: 'bold', textTransform: 'none' }} onClick={()=> navigate('/login')}> Iniciar sesión </Button>
                </Box>
            </Box>
        </form>
        {openWarning && 
          <Stack spacing={2} sx={{alignItems:'center'}}>
          <Alert severity="error" sx={{alignItems:'center'}}>Lamentablemente no ha podido registrarse. Por favor intente más tarde.</Alert>
      </Stack>
    }
    </div>
  )
}

export default CreateAcountForm