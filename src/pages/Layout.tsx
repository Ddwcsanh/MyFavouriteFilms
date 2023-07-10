import Navigation from '~/components/Navigation'
import Footer from '~/components/Footer'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'

const Layout = () => {
  return (
    <>
      <Navigation />
      <Box marginTop={'64px'}>
        <Outlet />
      </Box>
      <Footer />
    </>
  )
}

export default Layout
