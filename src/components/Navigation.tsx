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
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ThemeContext } from '~/contexts/ThemeContext'
import { Avatar, IconButton, Tooltip } from '@mui/material'
import { Brightness4, Brightness7, Login } from '@mui/icons-material'
import { useAuth } from '~/contexts/AuthContext'

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
    } else if (location.pathname.includes('/detail')) {
      setActiveLink('/home')
    } else if (location.pathname.includes('/film-mng')) {
      setActiveLink('/film-mng')
    } else {
      setActiveLink('')
    }
  }, [location])

  return [activeLink, setActiveLink] // Return the state and setter function
}

const ResponsiveAppBar = () => {
  const { user, logout } = useAuth()
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
  const { toggle, theme, dark } = React.useContext(ThemeContext)

  const [activeLink, setActiveLink] = useActiveLink('/home') // Use the custom hook

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  // const { login } = UserAuth()
  const navigate = useNavigate()
  // const handleGoogleSignIn = async () => {
  //   try {
  //     await login()
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  React.useEffect(() => {
    if (user != null) {
      navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const handleClick = (page: string) => {
    typeof setActiveLink === 'function' && setActiveLink(`/${page.toLocaleLowerCase()}`)
    window.scrollTo(0, 0)
  }

  return (
    <AppBar position='fixed' sx={{ backgroundColor: theme.primaryColor, height: '64px' }}>
      <Container maxWidth={false}>
        <Toolbar sx={{ padding: { md: '0 2rem' } }} disableGutters>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '2rem',
              mr: { md: '1rem', lg: '5rem' }
            }}
            component={Link}
            to={'/'}
          >
            <VideoStableRoundedIcon sx={{ fontSize: '2rem', mr: '1rem' }} />
            <Typography
              variant='h6'
              noWrap
              sx={{
                fontFamily: 'monospace',
                fontWeight: 'bold',
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              MY FAVOURITE FILMS
            </Typography>
          </Box>
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
                    onClick={() => handleClick(page)}
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
              {user && (
                <MenuItem
                  key='Film Management'
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
                    to='/film-mng'
                    onClick={() => handleClick('Film Management')}
                    style={{
                      color: activeLink === '/film-mng' ? theme.redPrimary : 'black',
                      textDecoration: 'none',
                      padding: '0.5rem 1.5rem'
                    }}
                  >
                    Films
                  </Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '2rem',
              mr: { md: '1rem', lg: '5rem' },
              flexGrow: 0.8
            }}
            component={Link}
            to={'/'}
          >
            <VideoStableRoundedIcon sx={{ mr: 2, fontSize: '2rem' }} />
            <Typography
              variant='h5'
              noWrap
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
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} height={'4rem'} padding={'0 auto'}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleClick(page)}
                sx={{
                  color: 'white',
                  display: 'flex',
                  borderRadius: 0,
                  boxShadow: 'none',
                  padding: 0,
                  width: '10vw',
                  height: '100%',
                  '&:hover': {
                    backgroundColor: theme.redDarker
                  }
                }}
                variant={activeLink === `/${page.toLocaleLowerCase()}` ? 'contained' : 'text'}
                color={'error'}
                component={Link}
                to={page === 'Home' ? '/' : `/${page.toLocaleLowerCase()}`}
              >
                {page}
              </Button>
            ))}
            {user && (
              <Button
                key='Film Management'
                onClick={() => handleClick('Film Management')}
                sx={{
                  color: 'white',
                  display: 'flex',
                  borderRadius: 0,
                  boxShadow: 'none',
                  padding: 0,
                  width: '10vw',
                  height: '100%',
                  textAlign: 'center',
                  '&:hover': {
                    backgroundColor: theme.redDarker
                  }
                }}
                variant={activeLink === '/film-mng' ? 'contained' : 'text'}
                color={'error'}
                component={Link}
                to='/film-mng'
              >
                Films
              </Button>
            )}
          </Box>
          <Box sx={{ flexGrow: 0 }} display={'flex'}>
            {user ? (
              <>
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
                  <MenuItem
                    onClick={handleCloseUserMenu}
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
                      to={'/profile'}
                      style={{
                        textDecoration: 'none',
                        padding: '0.5rem 1.5rem'
                      }}
                    >
                      Profile
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={handleCloseUserMenu}
                    style={{
                      padding: '0',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Typography
                      fontWeight={'bold'}
                      onClick={handleSignOut}
                      style={{
                        textDecoration: 'none',
                        padding: '0.5rem 1.5rem'
                      }}
                    >
                      Logout
                    </Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                sx={{ color: 'white', lineHeight: 0 }}
                startIcon={<Login />}
                onClick={() => {
                  navigate('/login')
                }}
              >
                Sign in
              </Button>
            )}
            <IconButton sx={{ ml: 1 }} onClick={toggle} color='inherit' disableFocusRipple disableTouchRipple>
              {dark ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default ResponsiveAppBar
