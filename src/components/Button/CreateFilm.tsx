import { Button } from '@mui/material'
import { useState } from 'react'
import CreateFilmModal from '../Modal/CreateFilmModal'
import { Add } from '@mui/icons-material'

const CreateFilm = () => {
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      <Button variant='contained' color='primary' startIcon={<Add />} onClick={() => setOpen(true)}>
        Add new film
      </Button>
      <CreateFilmModal open={open} handleClose={handleClose} />
    </>
  )
}

export default CreateFilm
