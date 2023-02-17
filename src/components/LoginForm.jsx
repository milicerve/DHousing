import { Box, Button, IconButton, TextField, Typography, Alert, Stack } from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {useNavigate} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './style/loginCreateAccount.css';

const LoginForm = () => {

  const navigate = useNavigate();

  const [openWarning, setOpenWarning] = useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm();

  //console.log( errors )
  /*const usuarioTemporal = {
    email: 'usuariotemporal@dh.com',
    password: 'digitalhouse',
    nombre: 'Juana',
    apellido:'Molina'
  }*/

  function closeWarning () {
    setOpenWarning(false)
  }


  function userInfo () {
    const email = JSON.parse(localStorage.getItem("email"))
    const options = {method: 'GET'}; 
    return fetch('http://ec2-3-19-211-226.us-east-2.compute.amazonaws.com:8080/usuario', options)
    .then((response) => {
      if(response.ok){
        return response.json()
          .then((data) => {
            const userInfo = data.filter((item) => item.email === email)
            localStorage.setItem("nombre", JSON.stringify(userInfo[0].nombre))
            localStorage.setItem("apellido", JSON.stringify(userInfo[0].apellido))
            localStorage.setItem("rol", JSON.stringify(userInfo[0].rol.nombre))
            localStorage.setItem("ciudad", JSON.stringify(userInfo[0].ciudad.nombre))
        })
        .catch((err) => {
          console.log(err);
        })
      } else{
      }
    })
  }

  const onSubmit=(data) => {
    localStorage.setItem("email", JSON.stringify(data.email));
    fetch('http://ec2-3-19-211-226.us-east-2.compute.amazonaws.com:8080/usuario/login', {
        method: 'POST',
        body: JSON.stringify({
            email: data.email,
            password: data.password
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
      })
    .then((response) => {
      if(response.ok){
        response.json()
        .then((data) => {
          console.log(data);
          localStorage.setItem("token", JSON.stringify(data.jwt));
          userInfo().then(() => {
            navigate('/')
          })
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
    <>
    <IconButton 
            aria-label='CloseIcon' 
            className='loginCreateAccount-close'
            onClick={()=> navigate('/')}
            >
            <CloseIcon />
    </IconButton>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box className='loginCreateAccount-formBox'>
        <Typography variant='h6' className='loginCreateAccount-title' fontWeight={'bold'}>  Iniciar sesión  </Typography>
        <Box className='loginCreateAccount-loginFormInput'>
          <Typography className='loginCreateAccount-formTypography'> Correo electrónico </Typography>
          <TextField
                    name='email'
                    type={'email'} 
                    placeholder='Escribe tu correo electrónico'
                    className='loginCreateAccount-textfield'
                    {...register('email', {
                        required: 'Campo obligatorio',
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

        <Box className='loginCreateAccount-loginFormInput'>
          <Typography className='loginCreateAccount-formTypography'> Contraseña </Typography>
          <TextField  
                    name='password'
                    type={'password'}
                    placeholder='Escribe tu contraseña' 
                    className='loginCreateAccount-textfield'
                    {...register('password', {
                      required: 'Campo obligatorio',
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
              
        <Button 
              variant='contained' 
              type='submit'
              sx={{ marginTop: '10px', 
                    width: '10rem', 
                    color: 'white', 
                    textTransform: 'none',
                    fontWeight: 'bold'   }}
                    > 
                    Ingresar 
        </Button>

        <Box className='loginCreateAccount-createAccount'>
          <Typography className='loginCreateAccount-formTypography'> ¿Aún no tienes cuenta? </Typography>
          <Button 
              sx={{fontWeight: 'bold', textTransform: 'none' }} 
              onClick={()=> navigate('/createAccount')}
              > 
              Registrarse 
          </Button>
        </Box>
      </Box>
    </form>
    {openWarning && 
      <Stack spacing={2} sx={{alignItems:'center'}}>
        <Alert severity="error" sx={{alignItems:'center'}}>Por favor vuelva a intentarlo, sus credenciales son inválidas.</Alert>
      </Stack>
    }
    </>
  )
}

export default LoginForm