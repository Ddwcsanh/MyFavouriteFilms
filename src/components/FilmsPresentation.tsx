import * as React from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Info } from '@mui/icons-material'
import { Film } from '~/global/interface'
import { ThemeContext } from '~/contexts/ThemeContext'

interface FilmPresentationProps {
  films: Film[]
}

export default function FilmsPresentation(props: FilmPresentationProps) {
  const navigate = useNavigate()
  const { theme } = React.useContext(ThemeContext)
  const handleClick = (id: number | undefined) => {
    navigate(`/detail/${id}`)
    window.scrollTo(0, 0)
  }

  return (
    <Grid
      container
      spacing={{ xs: 4, sm: 6, md: 10 }}
      sx={{
        margin: '0',
        padding: { xs: '0.5rem', sm: '1rem' },
        justifyContent: 'center'
      }}
    >
      {props.films.map((film) => (
        <Grid /*xs={12} sm={6} lg={4} item*/ xs={12} sm={6} lg={4} key={film.id}>
          <Card
            style={{
              backgroundColor: theme.cardColor,
              height: '100%',
              position: 'relative'
            }}
          >
            <CardMedia sx={{ height: 0, paddingTop: '150%' }} image={film.image} title={film.title} />
            <CardContent style={{ paddingBottom: '4rem' }}>
              <Typography gutterBottom variant='h5' component='div' fontWeight={'bold'} style={{ color: theme.color }}>
                {film.title}
              </Typography>
              <Typography variant='body2' color={theme.color}>
                Nation: {film.nation}
              </Typography>
              <Typography variant='body2' color={theme.color}>
                Year: {film.year}
              </Typography>
            </CardContent>
            <CardActions style={{ right: '5px', bottom: '5px', position: 'absolute' }}>
              <Button
                variant='contained'
                startIcon={<Info />}
                onClick={() => {
                  handleClick(film.id)
                }}
                color='error'
              >
                Detail
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
