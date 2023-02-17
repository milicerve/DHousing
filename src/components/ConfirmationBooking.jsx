import React from 'react'
import { Card, Typography, Button} from "@mui/material"
import VerifiedIcon from '@mui/icons-material/Verified';
import {useNavigate} from 'react-router-dom'


const ConfirmationBooking = () => {

    const navigate = useNavigate();

    return (
        <div className='container-confirmation' style={{width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Card sx={{ display:'flex', flexDirection: 'column', alignItems: 'center', padding:'30px'}}>
                <VerifiedIcon fontSize='large' color='primary' sx={{fontSize: '80px'}}/>
                <Typography sx={{ fontStyle: 'italic', color: '#607D8B', fontSize: '1.2rem'}}>¡Muchas gracias!</Typography>
                <Typography>Su reserva se ha realizado con éxito</Typography>
                <Button
                    variant= 'contained'
                    sx={{ width: '80%', fontWeight: 'bold', textTransform: 'none', alignItems: 'center', color: 'white', margin: '10px' }} 
                    onClick={()=> navigate('/')}
                    > 
                    Aceptar
                </Button>
            </Card>
        </div>
    )
}

export default ConfirmationBooking