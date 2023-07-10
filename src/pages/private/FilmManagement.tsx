import { Box, ButtonGroup, Dialog, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid/models'
import CreateFilm from '~/components/Button/CreateFilm'
import { useData } from '~/contexts/DataContext'
import { ThemeContext } from '~/contexts/ThemeContext'
import * as React from 'react'
import EditFilm from '~/components/Button/EditFilm'
import DeleteFilm from '~/components/Button/DeleteFilm'

const FilmManagement = () => {
  const { films } = useData()
  const { theme } = React.useContext(ThemeContext)
  const [open, setOpen] = React.useState(false)
  const [currentFilm, setCurrentFilm] = React.useState<string>('')

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 50,
      sortable: false,
      filterable: false,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'image',
      headerName: 'Image',
      width: 100,
      sortable: false,
      filterable: false,
      headerAlign: 'center',
      align: 'center',
      renderCell: (param) => <img src={param.value} alt='film' height='100%' />
    },
    { field: 'title', headerName: 'Title', minWidth: 100, maxWidth: 250, flex: 1 },
    { field: 'description', headerName: 'Description', minWidth: 200, flex: 1 },
    { field: 'year', headerName: 'Year', headerAlign: 'center', align: 'center', width: 80 },
    { field: 'nation', headerName: 'Nation', headerAlign: 'center', align: 'center', width: 90 },
    {
      field: 'trailer',
      headerName: 'Trailer',
      width: 80,
      sortable: false,
      filterable: false,
      headerAlign: 'center',
      align: 'center',
      renderCell: (param) => (
        <>
          <Typography
            onClick={() => {
              setOpen(true)
              setCurrentFilm(param.value)
            }}
            sx={{ cursor: 'pointer', textDecoration: 'underline' }}
          >
            Link
          </Typography>
        </>
      )
    },
    {
      field: 'edit',
      headerName: '',
      width: 50,
      sortable: false,
      filterable: false,
      headerAlign: 'center',
      align: 'center',
      renderCell: (param: GridRenderCellParams) => (
        <>
          <EditFilm filmId={param.row.id as number} />
        </>
      )
    },
    {
      field: 'delete',
      headerName: '',
      width: 50,
      sortable: false,
      filterable: false,
      headerAlign: 'center',
      align: 'center',
      renderCell: (param: GridRenderCellParams) => (
        <>
          <DeleteFilm filmId={param.row.id as number} />
        </>
      )
    }
  ]

  return (
    <Box sx={{ p: 4, height: 'calc(100vh - 64px)' }}>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth={false}>
        <iframe
          className='video'
          src={currentFilm}
          title='YouTube video player'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          style={{ border: 'none' }}
          allowFullScreen
          width='100%'
          height='600'
        ></iframe>
      </Dialog>
      <Typography align='center' variant='h4' style={{ color: theme.color }}>
        Film Management
      </Typography>
      <ButtonGroup sx={{ my: 2 }} style={{ display: 'flex', justifyContent: 'end' }}>
        <CreateFilm />
      </ButtonGroup>
      <DataGrid
        disableColumnMenu
        disableRowSelectionOnClick
        sx={{
          height: 'calc(100vh - 250px)',
          '.MuiIconButton-root': { color: theme.color },
          '.MuiTablePagination-root': { color: theme.color },
          '.MuiSelect-icon': { color: theme.color }
        }}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } }
        }}
        pageSizeOptions={[5, 10, 25]}
        rowHeight={120}
        rows={films}
        columns={columns}
        style={{ backgroundColor: theme.cardColor, color: theme.color }}
      />
    </Box>
  )
}

export default FilmManagement
