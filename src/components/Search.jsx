import React from 'react'
import { AppBar, Toolbar, Typography } from "@mui/material";
import SearchBar from './SearchBar'
import { useState, useEffect } from 'react';

const Search = () => {

    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 790px)").matches
    )
    
    useEffect(() => {
        window
        .matchMedia("(min-width: 790px)")
        .addEventListener('change', e => setMatches( e.matches ));
    }, []);

    return (
        <>
            {   matches  
                ? ( <AppBar sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', bgcolor: '#607D8B', height: '13em', zIndex: 1, marginTop: '2rem'}}>
                        <Toolbar sx= {{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100vw', margin:'20px'}}>
                            <Typography sx={{ fontSize: '30px', marginTop: '2.5rem', marginBottom:'3rem', color: '#FFFFFF', fontWeight: 600, textAlign: 'center'}} variant='h1'>Busca ofertas en hoteles, casas y mucho más</Typography>
                            <SearchBar/>
                        </Toolbar>
                    </AppBar>
                )
                : ( <AppBar sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', bgcolor: '#607D8B', height: '28em', zIndex: 1, marginTop: '-100px', width: '100%'}}>
                        <Toolbar sx= {{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100vw', minHeight: '47px'}}>
                            <Typography sx={{ fontSize: '20px', marginTop: '20px', marginBottom: '10px', color: '#FFFFFF', fontWeight: 600, textAlign: 'center'}} variant='h1'>Busca ofertas en hoteles, casas y mucho más</Typography>
                            <SearchBar/>
                        </Toolbar>
                    </AppBar>
                )
            }
        </>
    )
}

export default Search