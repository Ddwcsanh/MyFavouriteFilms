import { IconButton } from '@mui/material'
import { useContext, useState } from 'react'
import { Delete } from '@mui/icons-material'
import DeleteFilmModal from '../Modal/DeleteFilmModal'
import { ThemeContext } from '~/contexts/ThemeContext'

interface Props {
  filmId: number
}

const DeleteFilm = (props: Props) => {
  const [open, setOpen] = useState(false)
  const { theme } = useContext(ThemeContext)
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <IconButton size='small' sx={{ m: 1 }} onClick={() => setOpen(true)} style={{ color: theme.redPrimary }}>
        <Delete />
      </IconButton>

      <DeleteFilmModal open={open} handleClose={handleClose} filmId={props.filmId} />
    </>
  )
}

export default DeleteFilm
