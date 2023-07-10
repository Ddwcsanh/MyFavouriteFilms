import { IconButton } from '@mui/material'
import { useState, useEffect } from 'react'
import { Edit } from '@mui/icons-material'
import EditFilmModal from '../Modal/EditFilmModal'
import { useData } from '~/contexts/DataContext'
import { Film } from '~/global/interface'

interface Props {
  filmId: number
}

const EditFilm = (props: Props) => {
  const [open, setOpen] = useState(false)
  const [film, setFilm] = useState<Film | null>(null)
  const handleClose = () => {
    setOpen(false)
  }

  const { films } = useData()

  useEffect(() => {
    const foundFilm = films.find((film) => film.id === props.filmId)
    if (foundFilm) {
      setFilm(foundFilm)
    }
  }, [props.filmId, films])

  return (
    <>
      <IconButton size='large' sx={{ m: 1 }} onClick={() => setOpen(true)} style={{ color: '#1976D2' }}>
        <Edit />
      </IconButton>
      {film && <EditFilmModal open={open} handleClose={handleClose} film={film} />}
    </>
  )
}
export default EditFilm
