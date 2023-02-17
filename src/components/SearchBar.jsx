import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faLocationDot} from '@fortawesome/free-solid-svg-icons'
import './style/searchBar.css'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { format } from 'date-fns'
import { Button, Autocomplete, TextField } from "@mui/material";
//import dataProduct from '../productData.json'
import useFetch from '../hooks/useFetch'
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {

    const [openDate, setOpenDate] = useState(false)

    const [valueCiudad, setValueCiudad] = useState(null)

    const [date, setDate] = useState([
        { 
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const navigate = useNavigate();

    const urlBase = 'http://ec2-3-19-211-226.us-east-2.compute.amazonaws.com:8080'
    const url = urlBase + '/ciudades';  
    
    const [dataInfo] = useFetch(url);

    const clickSearch = () => {
        const idCiudad = dataInfo.find(item => item.nombre === valueCiudad)
        navigate(`/producto/findByCiudad/${idCiudad.id}`)
    }

    return (
        <div className='header'>
                <div className='headerSearchItem'>
                <FontAwesomeIcon icon={faLocationDot} className='headerIcon'/>
                    <Autocomplete 
                        variant='contained'
                        size= 'small'
                        sx= {{width: '100%', color: '#263238'}}
                        options={dataInfo.map((item) => item.nombre )}
                        value={valueCiudad}
                        onChange= {(event, newValue) => {
                            setValueCiudad(newValue)
                        }} 
                        renderInput={(params) => (
                            <TextField
                            {...params}
                                placeholder="¿A dónde vamos?"
                                variant='standard'
                            />
                        )}
                    />
                </div>
                <div className='headerSearchItem '>
                    <FontAwesomeIcon icon={faCalendarDays} className='headerIcon'/>
                    <span onClick={() => setOpenDate(!openDate)} className='headerSearchText'>{`${format(date[0].startDate, 'MM/dd/yyyy')} a ${format(date[0].endDate, 'MM/dd/yyyy')}`}</span>
                    { openDate &&
                        <DateRange
                        editableDateInputs={true}
                        onChange={(item) => setDate([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={date}
                        className='date'
                        minDate={new Date(Date.now())}
                    />}
                </div>
                <div className='headerSearchItemButton'>
                    <Button variant= 'contained' sx= {{width: '100%', alignItems: 'center', zIndex: 1, textTransform: 'none', color: 'white', fontStyle: 'bold', height: '50px', fontSize: '15px'}} onClick={clickSearch}>Buscar</Button>
                </div>
            
        </div>
    )

}

export default SearchBar