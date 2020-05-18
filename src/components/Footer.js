import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

function Footer(){
    return (
        <>
        <Box mt={3} mb={3} style={{marginBottom:100}}>
            <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
                Redi{' '}
            {new Date().getFullYear()}
            {'.'}
            </Typography>
        </Box>
        </>
    )
}

export default Footer