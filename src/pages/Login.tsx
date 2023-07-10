import { Box, Button, Typography } from '@mui/material'
import GoogleButton from 'react-google-button'
import { Navigate, useNavigate } from 'react-router-dom'
import { ThemeContext } from '~/contexts/ThemeContext'
import * as React from 'react'
import { ArrowBack } from '@mui/icons-material'
import { useAuth } from '~/contexts/AuthContext'

const Login = () => {
  const { login, user } = useAuth()
  const navigate = useNavigate()
  const { theme } = React.useContext(ThemeContext)

  return !user ? (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: '100vw',
        height: '100vh'
      }}
    >
      <Typography
        variant='h3'
        sx={{
          fontFamily: `'Poppins', cursive`,
          zIndex: 9,
          color: 'white',
          fontWeight: 700,
          letterSpacing: '.3rem',
          textAlign: 'center',
          fontSize: 'clamp(2rem, 5vw, 4rem)',
          pointerEvents: 'none'
        }}
      >
        Welcome to My Favourite Films
      </Typography>
      <GoogleButton
        style={{ margin: '2rem', zIndex: 9, backgroundColor: theme.redPrimary, borderRadius: '4px' }}
        onClick={login}
      />
      <Button
        variant='contained'
        onClick={() => {
          navigate('/')
        }}
        startIcon={<ArrowBack />}
        sx={{ zIndex: 9 }}
        style={{ backgroundColor: theme.redPrimary }}
      >
        Back
      </Button>
    </Box>
  ) : (
    <Navigate to='/' />
  )
}

export default Login
