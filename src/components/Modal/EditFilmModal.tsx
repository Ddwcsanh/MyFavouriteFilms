import { Box, Button, FormControl, TextField, Typography } from '@mui/material'
import ModalLayout from '../layout/ModalLayout'
import { Film } from '~/global/interface'
import * as yup from 'yup'
import { useFormik } from 'formik'
import useListOfFilms from '~/api/useListOfFilms'
import { useEffect } from 'react'
import { useData } from '~/contexts/DataContext'

interface Props {
  open: boolean
  handleClose: () => void
  film: Film
}

const EditFilmModal = (props: Props) => {
  const { editFilmById, getFilms } = useListOfFilms()
  const { setFilms } = useData()

  const validationSchema = yup.object({
    id: yup.number().required('ID is required'),
    image: yup.string().trim().required('Image link is required'),
    title: yup.string().trim().required('Title is required'),
    year: yup.string().trim().required('Year is required'),
    nation: yup.string().trim().required('Nation is required'),
    description: yup.string().trim().required('Description is required'),
    trailer: yup.string().trim().required('Trailer link is required')
  })

  const formik = useFormik({
    initialValues: props.film,
    validationSchema: validationSchema,
    onSubmit: async ({ id, ...values }) => {
      try {
        console.log(values)
        await editFilmById(String(id), values)
        const updatedFilms = await getFilms()
        setFilms(updatedFilms)
        props.handleClose()
      } catch (error) {
        console.log(error)
        props.handleClose()
      }
    }
  })

  useEffect(() => {
    if (!props.open) {
      formik.resetForm()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!props.open])

  const unchanged =
    formik.values.id === formik.initialValues.id &&
    formik.values.image === formik.initialValues.image &&
    formik.values.title === formik.initialValues.title &&
    formik.values.year === formik.initialValues.year &&
    formik.values.nation === formik.initialValues.nation &&
    formik.values.description === formik.initialValues.description &&
    formik.values.trailer === formik.initialValues.trailer

  return (
    <ModalLayout open={props.open} handleClose={props.handleClose}>
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
          Edit film
        </Typography>
      </Box>
      <form method='POST' onSubmit={formik.handleSubmit}>
        <FormControl sx={{ width: '100%', height: '100%', px: 4, py: 2 }}>
          <TextField
            sx={{
              my: 1
            }}
            name='title'
            label={'Title'}
            variant='standard'
            onChange={formik.handleChange}
            value={formik.values.title}
            error={formik.errors.title ? true : false}
            helperText={formik.errors.title?.toString()}
            fullWidth
          />
          <TextField
            sx={{
              my: 1
            }}
            name='image'
            label={'Image link'}
            variant='standard'
            onChange={formik.handleChange}
            value={formik.values.image}
            error={formik.errors.image ? true : false}
            helperText={formik.errors.image?.toString()}
            fullWidth
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
              onChange={formik.handleChange}
              error={formik.errors.year ? true : false}
              helperText={formik.errors.year?.toString()}
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
              onChange={formik.handleChange}
              error={formik.errors.nation ? true : false}
              helperText={formik.errors.nation?.toString()}
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
            onChange={formik.handleChange}
            error={formik.errors.description ? true : false}
            helperText={formik.errors.description?.toString()}
            name='description'
          />
          <TextField
            sx={{ my: 1 }}
            label='Trailer link (Youtube embed link)'
            variant='standard'
            fullWidth
            value={formik.values.trailer}
            onChange={formik.handleChange}
            error={formik.errors.trailer ? true : false}
            helperText={formik.errors.trailer?.toString()}
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
            disabled={formik.isValidating || !formik.isValid || unchanged}
          >
            Edit
          </Button>

          <Button sx={{ my: 1, fontFamily: 'inherit' }} variant='text' onClick={props.handleClose} color={'error'}>
            Cancel
          </Button>
        </Box>
      </form>
    </ModalLayout>
  )
}

export default EditFilmModal
