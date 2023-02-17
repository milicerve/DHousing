import React from 'react'
import { CircularProgress, Stack } from '@mui/material'

const Spinner = () => {
    return (
        <Stack spacing={2} sx={{ display:'flex', alignItems: 'center', justifyContent: 'center', padding: '5px'}}>
            <CircularProgress/>
        </Stack>
    )
}

export default Spinner