import React from 'react'
import { Avatar, Button, AppBar, Toolbar, Typography, Drawer, Box, IconButton } from "@mui/material";
import logo from '../img/logo.png'
import { useState, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu'
import { useNavigate } from 'react-router-dom';
import DropdownNavbar from './DropdownNavbar';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import './style/Navbar.css';
import useFetch from '../hooks/useFetch'

const Navbar = () => {


    const navigate = useNavigate();
    const [openMenu, setOpenMenu] = useState()

    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 768px)").matches
    )

    console.log('----------> ', window.matchMedia("(min-width: 768px)").matches)
    

    const userNombre = JSON.parse(localStorage.getItem("nombre"))
    const userApellido = JSON.parse(localStorage.getItem("apellido"))
    const userRol = JSON.parse(localStorage.getItem("rol"))
    
    const token = JSON.parse(localStorage.getItem("token"))
    const urlBaseUsuario = 'http://ec2-3-19-211-226.us-east-2.compute.amazonaws.com:8080'
    const urlUsuario = urlBaseUsuario + "/usuario/datoUser?jwt=" + token

    const [dataInfoUsuario] = useFetch(urlUsuario);

    

    const handlerClickChangeAccount = () =>{
        localStorage.removeItem("nombre")
        localStorage.removeItem("apellido")
        localStorage.removeItem("token")
        localStorage.removeItem("rol")
        localStorage.removeItem("email")
        localStorage.removeItem("ciudad")
        localStorage.removeItem("dateEnd")
        localStorage.removeItem("dateStart")
        navigate('/login')
    }

    const handlerClickSingUp = () =>{
        localStorage.removeItem("nombre")
        localStorage.removeItem("apellido")
        localStorage.removeItem("rol")
        localStorage.removeItem("email")
        localStorage.removeItem("token")
        localStorage.removeItem("ciudad")
        localStorage.removeItem("dateEnd")
        localStorage.removeItem("dateStart")
        navigate('/')
    }
    const handlerClickAdmin = () =>{
        navigate('/administracion')
    }

    const handlerClickBooking = () =>{
        navigate(`/${dataInfoUsuario.id}/reservas`)
    }

    const items = userRol === 'ADMIN' ?
    [   
        {
            handlerClick: handlerClickBooking,
            anchor: "Mis reservas",
        }, 
        {
            handlerClick: handlerClickAdmin,
            anchor: "Administración",
        }, 
        {
            handlerClick: handlerClickChangeAccount,
            anchor: "Iniciar sesión con otra cuenta",
        },
        {
            handlerClick: handlerClickSingUp,
            anchor: "Cerrar sesión"
        }
    ] :
    [   
        {
            handlerClick: handlerClickBooking,
            anchor: "Mis reservas",
        }, 
        {
            handlerClick: handlerClickChangeAccount,
            anchor: "Iniciar sesión con otra cuenta",
        },
        {
            handlerClick: handlerClickSingUp,
            anchor: "Cerrar sesión"
        }
    ]
    
    
    useEffect(() => {
        window
        .matchMedia("(min-width: 768px)")
        .addEventListener('change', e => setMatches( e.matches ));
    }, []);
    

    return (
        <>
            <AppBar sx={{ background: '#FFFFFF' }} position='fixed'>
                <Toolbar sx={{ displa: 'flex', justifyContent: 'space-between' }}>
                    <div className="logo" style={{ display:'flex', alignItems: 'center' }}>
                        <Avatar className='navbarAvatar' alt="Logo" src={ logo } sx={{ width : 100, height: 100 }} onClick={() => {navigate('/')}}/>
                        {
                            matches && (
                                <Typography sx={{ fontStyle: 'italic', color: '#607D8B', fontSize: '1.2rem'}} onClick={() => {navigate('/')}}>Viví tu experiencia</Typography>
                            )
                        }
                    </div>
                    {   
                        matches
                        ? [ userNombre 
                            ? ( <>
                                <div className='saludo' style={{ display:'flex', flexDirection:'row', alignItems:'center' }}>
                                    <Avatar sx={{ bgcolor: '#607D8B', margin: '7px' }}> {userNombre.charAt(0).toUpperCase()}{userApellido.charAt(0).toUpperCase()}</Avatar>
                                    <div className='userSaludo' style={{ margin: '0px' }}>
                                        <p style={{ margin: '0px', color: 'gray' }}>Hola,</p>
                                        <h4 style={{ margin: '0px', color: '#607D8B' }}>{userNombre} {userApellido}</h4>
                                    </div>
                                    <DropdownNavbar items={items} />
                                </div>
                                </>)
                            :(
                                <>
                                <Button sx={{ marginLeft:'auto', width: '10rem', textTransform: 'none', border: '1px solid #607D8B', borderRadius: '5px', color: '#607D8B'}} variant='container' onClick={() => {navigate('/login')}} className='loginButton'>Iniciar sesión</Button>
                                <Button sx={{ marginLeft:'10px', width: '10rem', textTransform: 'none', border: '1px solid #607D8B', borderRadius: '5px', color: '#607D8B'}} variant='container' onClick={() => {navigate('/createAccount')}} className='loginButton'>Crear cuenta</Button>
                                </>
                            )]
                        : ( 
                            <>
                            <IconButton size='large' edge='start' color='inherit' aria-label='logo' onClick={() => setOpenMenu (true)}>
                                <MenuIcon />
                            </IconButton>
                            <Drawer
                                anchor='right'
                                open={openMenu}
                                onClose={() => setOpenMenu(false)}
                            >
                                <Box p={2} textAlign='center' role='presentation' sx={{padding: '0', position: 'relative'}} >
                                    <div style={{backgroundColor:'#607D8B', padding:'2rem', width: '100%', height:'100%' }}>
                                    <Typography component='div' sx={{ color: 'white', fontSize: '1.2rem', position: 'absolute', bottom: '0.5rem', right: '0.6rem' }}> MENÚ </Typography>
                                    </div>
                                    {
                                        userNombre 
                                        ? ( <>
                                            <div className='cerrarSesion-container' style={{ height:'100%', display:'flex', flexDirection: 'column' }}>
                                                <div className='saludo' style={{ display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-start', marginTop: '1rem'}}>
                                                    <Avatar sx={{ bgcolor: '#607D8B', margin: '7px' }}> {userNombre.charAt(0).toUpperCase()}{userApellido.charAt(0).toUpperCase()}</Avatar>
                                                    <div className='userSaludo' style={{ margin: '0px', display:'flex', alignItems: 'flex-start', flexDirection:'column'}}>
                                                        <p style={{ margin: '0px' }}>Hola,</p>
                                                        <h4 style={{ margin: '0px', color: '#607D8B' }}>{userNombre}</h4>
                                                        <h4 style={{ margin: '0px', color: '#607D8B' }}>{userApellido}</h4>
                                                    </div>
                                                </div>
                                                <Button sx={{ margin: '1rem', maxWidth: '15rem', textTransform: 'none', border: '1px solid #607D8B', borderRadius: '5px', color: '#607D8B'}}  onClick={() => {navigate(`/${dataInfoUsuario.id}/reservas`)}} className='loginButton'>Mis reservas</Button>
                                                {
                                                    userRol === 'ADMIN' && 
                                                    (
                                                        <Button sx={{ margin: '1rem', maxWidth: '15rem', textTransform: 'none', border: '1px solid #607D8B', borderRadius: '5px', color: '#607D8B'}}  onClick={() => {navigate('/administracion')}} className='loginButton'>Administración</Button> 
                                                    )
                                                }
                                                <div className='cerrarSesion' style={{ display: 'flex', alignItems: 'center', padding: '0.2rem', marginTop: '20px'}}>
                                                    <Typography sx={{ color: '#607D8B', fontSize: '0.8rem' }}>¿Deseas </Typography>
                                                    <Button sx={{ margin: '0.2rem', marginRight: '0', maxWidth: '15rem', textTransform: 'none', color: '#607D8B', padding: '0', fontWeight: '700', fontSize: '0.8rem'}} className='loginButton' onClick={() => handlerClickSingUp()} >cerrar sesión</Button>
                                                    <Typography sx={{ color: '#607D8B', fontSize: '1rem', padding: '0' }}>? </Typography>
                                                </div>
                                            </div>
                                            </>)
                                        :(
                                            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'end', paddingTop: '1rem'}}>
                                                <Button sx={{ margin: '0.5rem', maxWidth: '15rem', textTransform: 'none', border: '1px solid #607D8B', borderRadius: '5px', color: '#607D8B'}}  onClick={() => {navigate('/login')}} className='loginButton'>Iniciar sesión</Button>
                                                <Button sx={{ margin: '0.5rem', maxWidth: '15rem', textTransform: 'none', border: '1px solid #607D8B', borderRadius: '5px', color: '#607D8B'}} variant='container' onClick={() => {navigate('/createAccount')}} className='loginButton'>Crear cuenta</Button>
                                            </div>
                                        )
                                    }
                                </Box>
                                <div style={{width: '100%', backgroundColor: '#FBC02D', display: 'flex', justifyContent: 'end', position: 'absolute', bottom: '0'}}>
                                    <div className='icons'>
                                        <FacebookIcon sx={{color: 'white', padding:'3px', fontSize: '1.5rem'}}/>
                                        <LinkedInIcon sx={{color: 'white', padding:'3px', fontSize: '1.5rem'}}/>
                                        <TwitterIcon sx={{color: 'white', padding:'3px', fontSize: '1.5rem'}}/>
                                        <InstagramIcon sx={{color: 'white', padding:'3px', fontSize: '1.5rem'}}/>
                                    </div>
                                </div>
                            </Drawer>
                            </>
                        )        
                    }
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
