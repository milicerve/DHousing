import React from 'react'
import { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import './style/calendario.css'
import { Typography, Button } from "@mui/material"
import { format } from 'date-fns'

const Calendario = () => {

    const [fecha, setFecha] = useState(new Date([]));

    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 790px)").matches
    )

    const actualizarFecha = () => {
        const dateStart= format(fecha[0], 'MM/dd/yyyy')
        const dateEnd= format(fecha[1], 'MM/dd/yyyy')
        localStorage.setItem("dateStart", JSON.stringify(dateStart))
        localStorage.setItem("dateEnd", JSON.stringify(dateEnd))
        window.location.reload()
    }
    
    useEffect(() => {
        window
        .matchMedia("(min-width: 767px)")
        .addEventListener('change', e => setMatches( e.matches ));
    }, []);



    return (
        <div className='calendarBooking'>
                <Typography sx={{color: '#607D8B', fontWeight: '700', paddingBottom: '1rem', paddingLeft: '0.8rem', fontSize: '1.3rem', marginBottom: '0'}}>Fechas disponibles</Typography>
                <div className='super-container-calendar'>
                    <div className="calendar-container">
                    { matches === false 
                    ? <Calendar minDate={new Date(Date.now())} showDoubleView={false} selectRange={true} onChange={(value) => setFecha(value)} showFixedNumberOfWeeks={false} className='calendar-card-container'/>
                    : <Calendar minDate={new Date(Date.now())} showDoubleView={true} selectRange={true} onChange={(value) => setFecha(value)}  showFixedNumberOfWeeks={false} className='calendar-card-container'/>
                    }
                    </div>
                </div>
                <div style={{display:'flex', justifyContent: 'center'}}>
                    <Button 
                            variant='outlined' 
                            sx={{ marginTop: '10px',
                            color: '#607D8B', 
                            textTransform: 'none',
                            fontWeight: 'bold',
                            margin: '10px',
                            border: 'black',
                            }}
                            type='submit'
                            className='detailsButton'
                            onClick={actualizarFecha}
                            > 
                            Actualizar Fecha de Reserva
                        </Button>
                </div>
            </div>
    )
}

export default Calendario