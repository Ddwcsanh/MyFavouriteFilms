import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import VideoStableRoundedIcon from '@mui/icons-material/VideoStableRounded'
import Brightness6RoundedIcon from '@mui/icons-material/Brightness6Rounded'
import { Link, useLocation } from 'react-router-dom'
import { ThemeContext } from '~/contexts/ThemeContext'
import { Avatar, IconButton, Tooltip } from '@mui/material'
import { UserAuth } from '~/contexts/AuthContext'

const pages = ['Home', 'About', 'News', 'Contact']

function useActiveLink(initialLink: string) {
  const [activeLink, setActiveLink] = React.useState(initialLink)

  const location = useLocation()

  React.useEffect(() => {
    const page = pages.find((page) => {
      if (page === 'Home') return location.pathname === '/'
      else return `/${page.toLocaleLowerCase()}` === location.pathname
    })
    if (page) {
      setActiveLink(`/${page.toLocaleLowerCase()}`)
    } else {
      setActiveLink('/')
    }
  }, [location])

  return [activeLink, setActiveLink] // Return the state and setter function
}

function ResponsiveAppBar() {
  const { user, logout } = UserAuth()
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleSignOut = async () => {
    try {
      await logout()
    } catch (error) {
      console.log(error)
    }
  }

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const { toggle, theme } = React.useContext(ThemeContext)

  const [activeLink, setActiveLink] = useActiveLink('/home') // Use the custom hook

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <AppBar position='static' sx={{ backgroundColor: theme.primaryColor }}>
      <Container maxWidth={false}>
        <Toolbar>
          <VideoStableRoundedIcon
            sx={{
              display: { xs: 'none', md: 'flex' },
              margin: 'auto 2rem'
            }}
          />
          <Typography
            variant='h6'
            noWrap
            component={Link}
            to='/'
            sx={{
              mr: { md: 2, lg: 10 },
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 'bold',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            MY FAVOURITE FILMS
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={handleCloseNavMenu}
                  style={{
                    padding: '0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Typography
                    component={Link}
                    fontWeight={'bold'}
                    to={page === 'Home' ? '/' : `/${page.toLocaleLowerCase()}`}
                    onClick={() => typeof setActiveLink === 'function' && setActiveLink(`/${page.toLocaleLowerCase()}`)}
                    style={{
                      color: activeLink === `/${page.toLocaleLowerCase()}` ? theme.redPrimary : 'black',
                      textDecoration: 'none',
                      padding: '0.5rem 1.5rem'
                    }}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <VideoStableRoundedIcon sx={{ display: { xs: 'flex', md: 'none' }, margin: 'auto', mr: 1 }} />
          <Typography
            variant='h5'
            noWrap
            component={Link}
            to='/'
            sx={{
              mr: 0,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            FILMS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} height={'4rem'}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => typeof setActiveLink === 'function' && setActiveLink(`/${page.toLocaleLowerCase()}`)}
                sx={{
                  color: 'white',
                  display: 'block',
                  borderRadius: 0,
                  boxShadow: 'none',
                  padding: 0
                }}
                variant={activeLink === `/${page.toLocaleLowerCase()}` ? 'contained' : 'text'}
                color={'error'}
              >
                <Link
                  style={{
                    textDecoration: 'none',
                    color: 'white',
                    padding: '1.5rem 2.5rem'
                  }}
                  to={page === 'Home' ? '/' : `/${page.toLocaleLowerCase()}`}
                >
                  {page}
                </Link>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {user?.displayName ? (
              <div>
                <Tooltip title='Open settings'>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user?.email || 'User'} src={user?.photoURL || ''} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id='menu-appbar'
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign='center'>
                      <Link to='/dashboard' style={{ textDecoration: 'none' }}>
                        Dashboard
                      </Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography textAlign='center' onClick={handleSignOut}>
                      Logout
                    </Typography>
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <Link to='/login' style={{ textDecoration: 'none' }}>
                <Button sx={{ my: 2, color: 'white', display: 'block' }}>Sign in</Button>
              </Link>
            )}
          </Box>

          <IconButton sx={{ ml: 1 }} onClick={toggle} color='inherit' disableFocusRipple disableTouchRipple>
            <Brightness6RoundedIcon />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default ResponsiveAppBar
