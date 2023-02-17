import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
//import dataProduct from '../../productData.json';
import CalendarBooking from '../../components/CalendarBooking';
import './booking.css';
import ProductHeaderBooking from '../../components/ProductHeaderBooking';
import ProductPoliticsBooking from '../../components/ProductPoliticsBooking';
import useFetch from '../../hooks/useFetch'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Spinner from '../../components/Spinner';
import { Stack, Alert, Box, TextField, Typography, Card, CardMedia, Button} from '@mui/material'
import '../../components/style/reservationForm.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import '../../components/style/reservationCard.css';
import { useNavigate } from 'react-router-dom';


const Reservation = () => {
    
    const { id } = useParams()

    const navigate = useNavigate()
    //const product = dataProduct.find(item => item.id === id)

    const urlBase = 'http://ec2-3-19-211-226.us-east-2.compute.amazonaws.com:8080'
    const url = urlBase + '/producto/' + id

    const [dataInfo, err, isLoaded] = useFetch(url);

    const token = JSON.parse(localStorage.getItem("token"))
    const ciudad = JSON.parse(localStorage.getItem("ciudad")) === null ? '': JSON.parse(localStorage.getItem("ciudad"))

    if(token === null ){
        navigate('/login')
    }

    const urlBaseUsuario = 'http://ec2-3-19-211-226.us-east-2.compute.amazonaws.com:8080'
    const urlUsuario = urlBaseUsuario + "/usuario/datoUser?jwt=" + token

    const [dataInfoUsuario] = useFetch(urlUsuario);

    const [openWarning, setOpenWarning] = useState(false)
    
    function closeWarning () {
        setOpenWarning(false)
        }

    const dateStart = JSON.parse(localStorage.getItem("dateStart"))
    const dateEnd = JSON.parse(localStorage.getItem("dateEnd"))

    function convertirFecha(string){
        const info = string.split('/')
        return info[2] + '-' + info[0] + '-' + info[1]
    }
    const fechaIngreso = (convertirFecha(dateStart))
    const fechaEgreso = (convertirFecha(dateEnd))


    const onSubmit=() => {
        fetch('http://ec2-3-19-211-226.us-east-2.compute.amazonaws.com:8080/reserva', {
            method: 'POST',
            body: JSON.stringify({
                usuario: {id: dataInfoUsuario.id},
                producto: {id: dataInfo.id},
                fechaIngreso: fechaIngreso,
                fechaEgreso: fechaEgreso,
                hora: '09:30 am'          
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${token}`
            },
        })
        .then((response) => {
            if(response.ok){
                response.json()
                .then((data) => {
                    console.log(data);
                    navigate('/confirmation')
                })
                .catch((err) => {
                    console.log(err.message);
                    setOpenWarning(true)
                    window.scrollTo(7000, 7000)
                    setTimeout(closeWarning, 3000)
                })
            } else{
                setOpenWarning(true)
                window.scrollTo(7000, 7000)
                setTimeout(closeWarning, 3000)
            }
        })
    };

    return (

    <>
        <Navbar />
    {isLoaded === false 
    ?   <Box sx={{widht: '100vh', height: '100vh', display:'flex', justifyContent: 'center', alignItems:'center'}}>
            <Spinner/>
        </Box>
    :   [(err === 500 || err === 403 || err === 400)
        ?   <Stack spacing={2} sx={{marginTop:'110px'}}>
                <Alert severity="error" sx={{alignItems:'center'}}>No se han podido cargar los datos, intenteló nuevamente.</Alert>
            </Stack>
        :   <div>
                <>
                <ProductHeaderBooking 
                    item = {dataInfo} 
                    key = {dataInfo.id}/>
                    <div className= 'reservationPage'>
                        <div className='reservationFormYCalendar'>
                            <Typography color='#607D8B'
                                variant= 'h6'
                                sx={{fontWeight: 'bold', paddingLeft: '2rem', marginTop: '1rem'}}
                                > Completá tus datos 
                            </Typography>
                            <form className='reservationFormContainer'>
                                <Box className='reservationFormBox'>
                                <div className='reservationFormDuoContainer'>
                                    <Box className='reservationFormInput'>
                                        <Typography sx={{fontSize: '0.8rem', color: '#607D8B'}}> Nombre </Typography>
                                        <TextField
                                                name='name'
                                                type={'name'} 
                                                className='textfieldReservation'
                                                value={dataInfoUsuario.nombre}
                                                >
                                        </TextField>
                                    </Box>

                                    <Box className='reservationFormInput'>
                                        <Typography sx={{fontSize: '0.8rem', color: '#607D8B'}}> Apellido </Typography>
                                        <TextField  
                                                name='lasName'
                                                type={'lastName'} 
                                                className='textfieldReservation'
                                                value={dataInfoUsuario.apellido}
                                                    >      
                                    </TextField>
                                    </Box>
                                </div>

                                <div className='reservationFormDuoContainer'>
                                    <Box className='reservationFormInput'>
                                        <Typography sx={{fontSize: '0.8rem', color: '#607D8B'}}> Correo electrónico </Typography>
                                        <TextField  
                                                name='email'
                                                type={'email'}
                                                className='textfieldReservation'
                                                value={dataInfoUsuario.email}
                                                    >      
                                    </TextField>
                                    </Box>

                                    <Box className='reservationFormInput'>
                                        <Typography sx={{fontSize: '0.8rem', color: '#607D8B'}}> Ciudad </Typography>
                                        <TextField  
                                                name='city'
                                                type={'city'}
                                                className='textfieldReservation'
                                                value={ciudad ? ciudad : null}
                                                    >      
                                    </TextField>
                                    </Box>
                                </div>
                                </Box>
                            </form>
                            <CalendarBooking 
                            className = 'reservationCalendarBooking'/>
                        </div>

                        <Card className='reservationCardContainer' >
                        <Typography 
                                    color='#607D8B'
                                    variant='h6' 
                                    sx={{fontWeight: 'bold', padding: '1rem'}}
                                    > Detalle de la reserva </Typography>
                        <CardMedia 
                                component="img"  
                                image={dataInfo.imagenes[0].urlImg} 
                                alt= {dataInfo.categoria.titulo} 
                                className='reservationCardMedia'
                            >
                        </CardMedia>
                        <Typography className='reservationCardCategory' sx={{fontSize: '0.8rem'}}>{dataInfo.categoria.titulo}</Typography>
                        <Typography className='reservationCardName' sx={{fontWeight: 'bold'}} >{dataInfo.titulo}</Typography>
                                <div className='reservationCardLocation'>
                                    <LocationOnIcon sx={{color: '#263238'}} fontSize='small' />
                                    <Typography variant='paragraph' sx={{color: '#263238'}}> {dataInfo.ubicacion} </Typography>
                                </div>
                                <div style={{paddingLeft: ' 0.5rem', paddingRight: ' 0.5rem', paddingTop: '0.5rem'}}>
                                    <hr />
                                    <Typography variant='paragraph' sx={{color: '#263238', fontSize: '0.8rem'}}>Check-in: {fechaIngreso}</Typography>
                                    <hr />
                                    <Typography variant='paragraph' sx={{color: '#263238', fontSize: '0.8rem'}}>Check-out: {fechaEgreso}</Typography>
                                    <hr />
                                    <Button 
                                                variant='contained' 
                                                sx={{ marginTop: '10px', 
                                                width: '100%', 
                                                color: 'white', 
                                                textTransform: 'none',
                                                fontWeight: 'bold',
                                                marginBottom: '0.8rem'
                                                }}
                                                onClick={onSubmit}
                                                className='detailsButton'
                                                > 
                                                Confirmar Reserva
                                    </Button>
                                </div>
                            </Card>

                    </div> 
                    <ProductPoliticsBooking
                            item = {dataInfo} 
                            key = {dataInfo.id}/>     
                </>
            </div>
        ]
    }
    {openWarning && 
        <Stack spacing={2} sx={{alignItems:'center', marginBottom:'40px'}}>
            <Alert severity="error" sx={{alignItems:'center'}}>No se han podido cargar los datos, intenteló nuevamente.</Alert>
        </Stack>
    }
    <Footer />
    </>
    )
}

export default Reservation