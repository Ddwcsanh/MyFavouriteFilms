import { Box, Button, FormControl, TextField, Typography } from '@mui/material'
import ModalLayout from '../layout/ModalLayout'
import { Film } from '~/global/interface'
import { useEffect, useState } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import useListOfFilms from '~/api/useListOfFilms'
import { useData } from '~/contexts/DataContext'

interface Props {
  open: boolean
  handleClose: () => void
}

const CreateFilmModal = (props: Props) => {
  const { open, handleClose } = props

  const { createFilm, getFilms } = useListOfFilms()
  const { setFilms } = useData()

  const [film, setFilm] = useState<Film | undefined>({
    id: 0,
    image: '',
    title: '',
    year: '',
    nation: '',
    description: '',
    trailer: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue(e.target.name, e.target.value)
  }

  const validationSchema = yup.object({
    id: yup.number().required('ID is required'),
    image: yup.string().required('Image link is required'),
    title: yup.string().required('Title is required'),
    year: yup.string().required('Year is required'),
    nation: yup.string().required('Nation is required'),
    description: yup.string().required('Description is required'),
    trailer: yup.string().required('Trailer link is required')
  })

  const formik = useFormik({
    initialValues: {
      id: film?.id,
      image: film?.image,
      title: film?.title,
      year: film?.year,
      nation: film?.nation,
      description: film?.description,
      trailer: film?.trailer
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await createFilm(values)
        const updatedFilms = await getFilms()
        setFilms(updatedFilms)
        handleClose()
      } catch (error) {
        console.log(error)
        handleClose()
      }
    }
  })

  useEffect(() => {
    if (!props.open) {
      formik.resetForm()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!props.open])

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
          New film
        </Typography>
      </Box>
      <form method='POST' onSubmit={formik.handleSubmit}>
        <FormControl sx={{ width: '100%', px: 5, my: 2 }}>
          <TextField
            sx={{ my: 1 }}
            onChange={handleChange}
            value={formik.values.title}
            label='Title'
            variant='standard'
            fullWidth
            name='title'
          />
          <TextField
            sx={{ my: 1 }}
            onChange={handleChange}
            value={formik.values.image}
            label='Image link'
            variant='standard'
            fullWidth
            name='image'
          />
          <Box display={'flex'} sx={{ width: '100%', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <TextField
              sx={{
                my: 1,
                width: {
                  xs: '100%',
                  sm: '47%'
                }
              }}
              label='Year'
              variant='standard'
              fullWidth
              value={formik.values.year}
              onChange={handleChange}
              name='year'
            />
            <TextField
              sx={{
                my: 1,
                width: {
                  xs: '100%',
                  sm: '47%'
                }
              }}
              label='Nation'
              variant='standard'
              fullWidth
              value={formik.values.nation}
              onChange={handleChange}
              name='nation'
            />
          </Box>

          <TextField
            sx={{ my: 1 }}
            label='Description'
            multiline
            maxRows={4}
            variant='standard'
            fullWidth
            value={formik.values.description}
            onChange={handleChange}
            name='description'
          />
          <TextField
            sx={{ my: 1 }}
            label='Trailer link (Youtube embed link)'
            variant='standard'
            fullWidth
            value={formik.values.trailer}
            onChange={handleChange}
            name='trailer'
          />
        </FormControl>

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
          <Button
            sx={{ my: 1, mr: 1, fontFamily: 'inherit' }}
            variant='contained'
            color='primary'
            type='submit'
            disabled={formik.isValidating || !formik.isValid}
          >
            Create
          </Button>
          <Button
            sx={{ my: 1, fontFamily: 'inherit' }}
            color={'error'}
            variant='text'
            onClick={() => {
              handleClose()
              setFilm({
                id: 0,
                image: '',
                title: '',
                year: '',
                nation: '',
                description: '',
                trailer: ''
              })
            }}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </ModalLayout>
  )
}

export default CreateFilmModal
