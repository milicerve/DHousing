import React from 'react'
import {AppBar, Toolbar, Typography } from "@mui/material";
import CopyrightIcon from '@mui/icons-material/Copyright';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import './style/footer.css';

const Footer = () => {
    return (
        <>
            <AppBar sx={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end', top: '95%', bottom: '0px'}}>
                <Toolbar sx= {{ minHeight: '0px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100vw'}}>
                    <div className='copyright'>
                        <CopyrightIcon sx={{color: 'white', paddingTop:'0.5rem', paddingBottom:'0.5rem', fontSize: '1.8rem'}}/>
                        <Typography sx={{ fontSize: '10px', paddingTop:'0.5rem', paddingBottom:'0.5rem', color:'white'}} variant='subtitle1'>2022 Digital Housing</Typography>
                    </div>
                    <div className='icons'>
                        <FacebookIcon sx={{color: 'white', padding:'3px', fontSize: '1.5rem'}}/>
                        <LinkedInIcon sx={{color: 'white', padding:'3px', fontSize: '1.5rem'}}/>
                        <TwitterIcon sx={{color: 'white', padding:'3px', fontSize: '1.5rem'}}/>
                        <InstagramIcon sx={{color: 'white', padding:'3px', fontSize: '1.5rem'}}/>
                    </div>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Footer