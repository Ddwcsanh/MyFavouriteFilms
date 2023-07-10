import * as React from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { ThemeContext } from '~/contexts/ThemeContext'
import { Box } from '@mui/material'

interface SidebarProps {
  archives: {
    title: string
    url: string
  }[]
  description: string
  title: string
}

function Sidebar(props: SidebarProps) {
  const { theme } = React.useContext(ThemeContext)
  const { archives, description, title } = props

  return (
    <Grid item xs={12} md={4} style={{ paddingTop: 0 }}>
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3
        }}
        style={{ backgroundColor: theme.cardColor, color: theme.color }}
      >
        <Typography variant='h6' gutterBottom>
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </Paper>
      <Box
        sx={{
          p: 2
        }}
        style={{ backgroundColor: theme.cardColor }}
      >
        <Typography variant='h6' gutterBottom>
          Archives
        </Typography>
        {archives.map((archive) => (
          <Link display='block' variant='body1' href={archive.url} key={archive.title}>
            {archive.title}
          </Link>
        ))}
      </Box>
    </Grid>
  )
}

export default Sidebar
