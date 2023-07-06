import React from 'react'
import { Films } from '../shared/listOfFilms'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Container, Typography } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { ThemeContext } from '~/contexts/ThemeContext'

const Detail = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const film = Films.find((film) => film.id === Number(id))
  const { theme } = React.useContext(ThemeContext)

  return (
    <Container
      //   maxWidth='false'
      sx={{
        display: 'flex',
        justifyContent: 'center',
        margin: '2rem 0',
        flexWrap: 'wrap-reverse'
      }}
    >
      <Box
        sx={{
          marginRight: { sm: '2rem', xs: 0 },
          marginBottom: { sm: 0, xs: '1rem' },
          marginTop: { xs: '2rem', sm: 0 },
          width: { sm: '30%', xs: '100%' },
          display: 'flex',
          objectFit: 'cover',
          justifyContent: 'center'
        }}
      >
        <img src={`../../${film?.image}`} alt={film?.title} />
      </Box>
      <Box
        sx={{ width: { sm: '60%', xs: '100%' } }}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignContent: 'space-between'
        }}
      >
        <Button
          startIcon={<ArrowBack />}
          variant='contained'
          color='error'
          onClick={() => {
            navigate('/')
          }}
          style={{ marginBottom: '10px' }}
        >
          Back
        </Button>

        <iframe
          className='video'
          src={film?.trailer}
          title='YouTube video player'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
        ></iframe>
        <Box>
          <Typography
            variant='h4'
            component='h1'
            fontWeight={'bold'}
            style={{
              width: '100%',
              color: theme.redPrimary,
              marginTop: '10px'
            }}
          >
            {film?.title}
          </Typography>
          <Typography variant='body1' style={{ width: '100%', color: theme.color, marginTop: '10px' }}>
            {film?.info}
          </Typography>
          <Typography variant='body2' style={{ width: '100%', color: theme.color, marginTop: '10px' }}>
            Nation: {film?.nation}
          </Typography>
          <Typography variant='body2' style={{ width: '100%', color: theme.color }}>
            Year: {film?.year}
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}

export default Detail
