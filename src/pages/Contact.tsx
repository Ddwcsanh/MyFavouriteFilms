import { Email, FacebookRounded, GitHub, Instagram, Phone } from '@mui/icons-material'
import {
  Box,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
  TextField,
  Button
} from '@mui/material'
import React, { useContext } from 'react'
import { ThemeContext } from '~/contexts/ThemeContext'

const Contact = () => {
  const { theme } = useContext(ThemeContext)
  const form = React.useRef()

  return (
    <Box
      padding={{ xl: '3rem 2rem', md: '3rem 1rem', xs: '2rem' }}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'stretch',
        justifyContent: 'center',
        minHeight: '72.9vh',
        backgroundColor: theme.backgroundColor
      }}
    >
      <Typography
        sx={{
          textAlign: 'center',
          height: 'rem',
          width: '100%',
          mb: '1rem'
        }}
        variant='h4'
        fontWeight={'bold'}
        color={theme.color}
      >
        Contact Information
      </Typography>
      <Paper
        sx={{
          width: { xl: '80%', md: '90%', xs: '100%' },
          height: 'auto',
          boxShadow: 'none'
        }}
        style={{
          backgroundColor: theme.cardColor,
          color: theme.color,
          borderRadius: '0'
        }}
      >
        <List
          sx={{
            p: { sm: '1rem', xs: '1rem 0' },
            display: 'flex',
            flexWrap: 'wrap'
          }}
        >
          <ListItem sx={{ flex: '1 0 25%' }}>
            <ListItemIcon>
              <Email style={{ color: theme.color }} />
            </ListItemIcon>
            <Link color='secondary' underline='hover' href='mailto:ledoducanh03@gmail.com'>
              ledoducanh03@gmail.com
            </Link>
          </ListItem>
          <ListItem sx={{ flex: '1 0 25%' }}>
            <ListItemIcon>
              <Phone style={{ color: theme.color }} />
            </ListItemIcon>
            <ListItemText sx={{ whiteSpace: 'nowrap' }}>
              <Link color='secondary' underline='hover' href='tel:+84971625830'>
                (+84) 971625830
              </Link>
            </ListItemText>
          </ListItem>
          <ListItem sx={{ flex: '1 0 25%' }}>
            <ListItemIcon>
              <GitHub style={{ color: theme.color }} />
            </ListItemIcon>
            <ListItemText sx={{ whiteSpace: 'nowrap' }}>
              <Link color='secondary' underline='hover' href='https://github.com/Ddwcsanh' target='_blank'>
                Ddwcsanh
              </Link>
            </ListItemText>
          </ListItem>
          <ListItem sx={{ flex: '1 0 25%' }}>
            <ListItemIcon>
              <FacebookRounded style={{ color: theme.color }} />
            </ListItemIcon>
            <ListItemText sx={{ whiteSpace: 'nowrap' }}>
              <Link color='secondary' underline='hover' href='https://facebook.com/ddwcsanh' target='_blank'>
                Anh Đỗ Đức Lê
              </Link>
            </ListItemText>
          </ListItem>
          <ListItem sx={{ flex: '1 0 25%' }}>
            <ListItemIcon>
              <Instagram style={{ color: theme.color }} />
            </ListItemIcon>
            <ListItemText sx={{ whiteSpace: 'nowrap' }}>
              <Link color='secondary' underline='hover' href='https://www.instagram.com/_ddwcsanh/' target='_blank'>
                _ddwcsanh
              </Link>
            </ListItemText>
          </ListItem>
        </List>
      </Paper>
      <Paper
        sx={{
          width: { xl: '40%', md: '45%', xs: '100%' },
          boxShadow: 'none'
        }}
        style={{ backgroundColor: theme.cardColor, borderRadius: 0 }}
      >
        <Box
          ref={form}
          component='form'
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            margin: '2% 0',
            width: '100%'
          }}
        >
          <TextField
            sx={{
              marginTop: '5%',
              marginBottom: '2%',
              width: '85%',
              '.MuiOutlinedInput-root': {
                color: theme.color
              },
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: theme.color
              },
              '.MuiHover-root': {
                borderColor: theme.color
              }
            }}
            label='Your Name'
            name='from_name'
            required
            InputLabelProps={{
              style: {
                color: theme.color
              }
            }}
          />

          <TextField
            sx={{
              marginTop: '5%',
              marginBottom: '2%',
              width: '85%',
              '.MuiOutlinedInput-root': {
                color: theme.color
              },
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: theme.color
              }
            }}
            type='email'
            label='Your Email'
            name='from_email'
            required
            InputLabelProps={{
              style: {
                color: theme.color
              }
            }}
          />

          <TextField
            sx={{
              marginTop: '5%',
              marginBottom: '2%',
              width: '85%',
              '.MuiOutlinedInput-root': {
                color: theme.color
              },
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: theme.color
              }
            }}
            label='Subject'
            name='subject'
            required
            InputLabelProps={{
              style: {
                color: theme.color
              }
            }}
          />

          <TextField
            sx={{
              marginTop: '5%',
              marginBottom: '2%',
              width: '85%',
              '.MuiOutlinedInput-root': {
                color: theme.color
              },
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: theme.color
              }
            }}
            label='Message'
            multiline
            rows={3}
            name='message'
            required
            InputLabelProps={{
              style: {
                color: theme.color
              }
            }}
          />
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              marginBottom: '4%'
            }}
          >
            <Button
              type='submit'
              variant='contained'
              sx={{ mx: 'auto', my: { xs: '2%', sm: '0' } }}
              size='large'
              color='error'
            >
              Send Message
            </Button>
          </Box>
        </Box>
      </Paper>
      <Box
        sx={{
          width: { xl: '40%', md: '45%', xs: '100%' },
          height: { xs: '50vh', md: 'auto' }
        }}
      >
        <iframe
          title='map'
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.153021509755!2d106.79869957589916!3d10.875963657348086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d99f191a9a8f%3A0x2d39d67349441db7!2zTmhhzIAgVsSDbiBIb8yBYSBTaW5oIFZpw6puIMSQSFFH!5e0!3m2!1svi!2s!4v1686271503274!5m2!1svi!2s'
          width='600'
          height='450'
          style={{ border: 0, width: '100%', height: '100%' }}
          allowFullScreen={true}
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
        ></iframe>
      </Box>
    </Box>
  )
}

export default Contact
