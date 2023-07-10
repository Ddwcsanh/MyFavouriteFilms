import { Box, CircularProgress } from '@mui/material'

const Loading = () => {
  return (
    <Box
      height={'calc(100vh - 64px)'}
      sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <CircularProgress size={80} />
    </Box>
  )
}

export default Loading
