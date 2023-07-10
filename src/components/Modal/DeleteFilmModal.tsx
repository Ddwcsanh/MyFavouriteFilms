import { Box, Button, Typography } from '@mui/material'
import ModalLayout from '../layout/ModalLayout'
import useListOfFilms from '~/api/useListOfFilms'
import { useData } from '~/contexts/DataContext'

interface Props {
  open: boolean
  handleClose: () => void
  filmId: number
}

const DeleteFilmModal = (props: Props) => {
  const { open, handleClose } = props

  const { deleteFilmById, getFilms } = useListOfFilms()
  const { setFilms } = useData()

  const handleDelete = async () => {
    try {
      await deleteFilmById(String(props.filmId))
      const updatedFilms = await getFilms()
      setFilms(updatedFilms)
      handleClose()
    } catch (error) {
      console.log(error)
      handleClose()
    }
  }

  return (
    <ModalLayout open={open} handleClose={handleClose}>
      <Box
        display={'inline-flex'}
        sx={{
          p: {
            xs: 1.5,
            sm: 3
          },
          background: 'white',
          zIndex: 1,
          width: '100%'
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            color: 'black',
            fontSize: {
              xs: '1.5rem',
              sm: '2rem'
            },
            mx: 1,
            fontFamily: 'inherit'
          }}
          variant='h4'
        >
          Delete film
        </Typography>
      </Box>
      <Box
        sx={{
          width: '100%',
          px: {
            xs: 2.5,
            sm: 4
          }
        }}
      >
        <Typography
          sx={{
            color: 'black',
            my: 1.5,
            fontSize: {
              xs: '1.1rem',
              sm: '1.3rem'
            },
            fontFamily: 'inherit'
          }}
          variant='body2'
        >
          Are you sure you want to delete this film?
        </Typography>
      </Box>
      <Box
        sx={{
          p: {
            xs: 1.5,
            sm: 4
          },
          background: 'white',
          display: 'flex',
          justifyContent: 'end',
          width: '100%'
        }}
      >
        <Button sx={{ my: 1, mr: 1 }} variant='contained' color='error' onClick={handleDelete}>
          Delete
        </Button>
        <Button sx={{ my: 1 }} color='error' variant='text' onClick={() => handleClose()}>
          Cancel
        </Button>
      </Box>
    </ModalLayout>
  )
}

export default DeleteFilmModal
