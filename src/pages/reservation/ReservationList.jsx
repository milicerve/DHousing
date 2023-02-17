import { Typography } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react';
import MyReservationCard from '../../components/MyReservationCard';
import { Alert, Stack, Box } from '@mui/material';
import Spinner from '../../components/Spinner';

const ReservationList = () => {

  const [dataReserva, setDataReserva] = useState([])
  console.log('estadoReserva', dataReserva)

  const [openWarning, setOpenWarning] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  
  function closeWarning () {
    setOpenWarning(false)
  }

  const userToken = JSON.parse(localStorage.getItem("token"))

  const userEmail = JSON.parse(localStorage.getItem("email"))

  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${userToken}`
    }
  };
  
  useEffect(() => {
    fetch('http://ec2-3-19-211-226.us-east-2.compute.amazonaws.com:8080/reserva', options)
      .then((response) => {
        if(response.ok){
          response.json()
          .then((data) => {
          const reservas = data.filter((item) => item.usuario.email === userEmail)
          console.log('dataReserva', reservas)
          setDataReserva(reservas)
          setIsLoaded(true)
          })
          .catch((err) => {
            console.log(err);
            setIsLoaded(true)
            setOpenWarning(true)
            setTimeout(closeWarning, 3000)
          })
        } else{
          setIsLoaded(true)
          setOpenWarning(true)
          setTimeout(closeWarning, 3000)
        }
    })
  }, [])

return (
    <>
    <Typography
              color='#607D8B'
              variant='h6' 
              sx={{fontWeight: 'bold', padding: '10px', marginTop: '7rem', marginLeft: '2rem', fontSize: '1.5rem'}}
              > 
              Tus reservas y viajes
    </Typography>
    {isLoaded === false 
    ?   <Box sx={{widht: '100vh', height: '100vh', display:'flex', justifyContent: 'center', alignItems:'center'}}>
            <Spinner/>
        </Box>
    : <div style={{marginBottom: '4rem'}}>
        {
          dataReserva.length === 0
          ? <Typography
                        sx={{ padding: '10px', marginLeft: '2.2rem'}}
                        >
                        No se han registrado reservas con este usuario.</Typography>
          : [dataReserva.map((item) =>
                <MyReservationCard 
                item = {item} 
                key = {item.id}/>
            )]
        }
      </div>
    } 
    {openWarning && 
      <Stack spacing={2}>
        <Alert severity="error" sx={{alignItems:'center'}}>No se han podido cargar los datos, intenteló nuevamente.</Alert>
      </Stack>
    }
    </>
  )
}

export default ReservationList