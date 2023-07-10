import { Avatar, Box, Paper, Typography } from '@mui/material'
import { useAuth } from '~/contexts/AuthContext'
import { ThemeContext } from '~/contexts/ThemeContext'
import * as React from 'react'

const Profile = () => {
  const { user } = useAuth()
  const { theme } = React.useContext(ThemeContext)
  return (
    <Box sx={{ height: 'calc(100vh - 64px)', p: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          height: '95%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.cardColor,
          color: theme.color
        }}
      >
        <Avatar src={`${user?.photoURL}`} alt={`${user?.displayName}`} sx={{ width: 150, height: 150 }} />
        <Typography variant='h4' sx={{ my: 1, textAlign: 'center' }}>
          {user?.displayName}
        </Typography>
        <Typography variant='body1' sx={{ my: 1, textAlign: 'center' }}>
          Phone: {user?.phoneNumber ? user?.phoneNumber : 'Not provided'}
        </Typography>
        <Typography variant='body1' sx={{ my: 1, textAlign: 'center' }}>
          Email: {user?.email}
        </Typography>
        <Typography variant='body1' sx={{ my: 1, textAlign: 'center' }}>
          Joining date: {user?.metadata.creationTime}
        </Typography>
      </Paper>
    </Box>
  )
}

export default Profile
