import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { ThemeContext } from '~/contexts/ThemeContext'

function Copyright() {
  return (
    <Typography variant='body2' color='white' textAlign={'center'}>
      {'Copyright ©'}
      {new Date().getFullYear()}
      {' Le Do Duc Anh | All rights reserved.'}
    </Typography>
  )
}

export default function Footer() {
  const { theme } = React.useContext(ThemeContext)

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100px'
      }}
      bgcolor={theme.primaryColor}
    >
      <Box
        component='footer'
        sx={{
          margin: 'auto'
        }}
      >
        <Copyright />
      </Box>
    </Box>
  )
}
