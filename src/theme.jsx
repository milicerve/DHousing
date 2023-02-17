import {createTheme} from '@mui/material'

const theme = createTheme({
    palette:{
        primary:{
            main: '#FBC02D'
        },
        secondary:{
            main: '#263238'
        }
        
    },
    typography:{
        errors:{
            fontSize: 14,
            color: 'red',
        }
    }
})

export default theme