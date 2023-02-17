import React from 'react'
import { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import './style/calendario.css'
import { Button, Typography } from "@mui/material"
import {useNavigate} from 'react-router-dom'
import { format } from 'date-fns'

const Calendario = ({ item }) => {

    const [fecha, setfecha] = useState(new Date([]));

    const navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem("token"))

    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 790px)").matches
    )

    const clickReserva = () => {
        if(token) {
            console.log(fecha);
            const dateStart= format(fecha[0], 'MM/dd/yyyy')
            const dateEnd= format(fecha[1], 'MM/dd/yyyy')
            console.log(dateStart)
            localStorage.setItem("dateStart", JSON.stringify(dateStart))
            console.log(dateEnd)
            localStorage.setItem("dateEnd", JSON.stringify(dateEnd))
            navigate(`/producto/${item.id}/reserva`)
        } else {
            navigate(`/login`)
        }
    }
    
    useEffect(() => {
        window
        .matchMedia("(min-width: 767px)")
        .addEventListener('change', e => setMatches( e.matches ));
    }, []);

    return (
        <div className='calendar'>
                <Typography sx={{color: '#607D8B', fontWeight: '700', paddingBottom: '1rem', fontSize: '1.3rem' }}>Fechas disponibles</Typography>
                <div className='super-container-calendar'>
                    <div className="calendar-container">
                    { matches === false 
                    ? <Calendar minDate={new Date(Date.now())} showDoubleView={false} selectRange={true} onChange={setfecha} showFixedNumberOfWeeks={false} className='calendar-card-container' />
                    : <Calendar minDate={new Date(Date.now())} showDoubleView={true} selectRange={true} onChange={setfecha} showFixedNumberOfWeeks={false} className='calendar-card-container'/>}
                    </div>
                    <div className="button-container">
                        <Typography sx={{color: '#263238', fontSize: '0.8rem', textAlign: 'center'}}>Agregá tus fechas de viajes para obtener precios exactos</Typography>
                        <Button variant='contained' 
                                sx={{   marginTop: '10px', 
                                        width: '100%', 
                                        color: 'white', 
                                        textTransform: 'none',
                                        fontWeight: 'bold',
                                    }}
                                onClick={clickReserva}
                                    >
                                        Iniciar reserva
                        </Button>
                    </div>
                </div>
            </div>
    )
}

export default Calendario