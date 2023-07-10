/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Container, IconButton, Typography } from '@mui/material'
import { ArrowBack, ArrowForward } from '@mui/icons-material'
import { ThemeContext } from '~/contexts/ThemeContext'
import useListOfFilms from '../api/useListOfFilms'
import { Film } from '~/global/interface'
import Loading from './Loading'
import { useData } from '~/contexts/DataContext'

const Detail = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { theme } = React.useContext(ThemeContext)
  const films = useData().films

  const [film, setFilm] = React.useState<Film>({})
  const filmNext = Number(film.id) + 1 <= films.length ? Number(film.id) + 1 : 1
  const filmPrev = Number(film.id) - 1 ? Number(film.id) - 1 : films.length
  const { getFilmById } = useListOfFilms()
  const [loading, setLoading] = React.useState<boolean>(true)

  const fetchFilm = async () => {
    const response = await getFilmById(id)
    setFilm(response)
    setLoading(false)
  }
  React.useEffect(() => {
    setLoading(true)
    fetchFilm()
  }, [getFilmById, id])

  return loading ? (
    <Loading />
  ) : (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
        padding: '2rem',
        flexWrap: 'wrap-reverse',
        minHeight: 'calc(100vh - 64px)'
      }}
    >
      <Box
        sx={{
          marginRight: { md: '2rem', xs: 0 },
          marginBottom: { md: 0, xs: '1rem' },
          marginTop: { xs: '2rem', md: 0 },
          width: { lg: '30%', md: '35%', xs: '100%' },
          display: 'flex',
          objectFit: 'cover',
          justifyContent: 'center',
          height: '100%'
        }}
      >
        <img src={`${film?.image}`} alt={film?.title} style={{ width: '100%', aspectRatio: '2/3' }} />
      </Box>
      <Box
        sx={{ width: { lg: '60%', md: '55%', xs: '100%' } }}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignContent: 'start'
        }}
      >
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant='contained'
            color='error'
            onClick={() => {
              navigate('/')
            }}
            style={{ marginBottom: '10px' }}
          >
            Return
          </Button>
          <Box>
            <IconButton
              onClick={() => {
                navigate('/detail/' + filmPrev)
              }}
              style={{
                marginBottom: '10px',
                marginRight: '10px',
                color: theme.white,
                backgroundColor: theme.redPrimary
              }}
            >
              <ArrowBack />
            </IconButton>
            <IconButton
              onClick={() => {
                navigate('/detail/' + filmNext)
              }}
              style={{
                marginBottom: '10px',
                marginRight: '10px',
                color: theme.white,
                backgroundColor: theme.redPrimary
              }}
            >
              <ArrowForward />
            </IconButton>
          </Box>
        </Box>

        <iframe
          className='video'
          src={`${film?.trailer}?autoplay=1&mute=0`}
          title='YouTube video player'
          style={{ border: 'none', borderRadius: '4px' }}
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
            {film?.description}
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
