import * as React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Markdown from './Markdown'
import { ThemeContext } from '~/contexts/ThemeContext'

interface MainProps {
  posts: string[]
  title: string
}

function Main(props: MainProps) {
  const { theme } = React.useContext(ThemeContext)

  const { posts, title } = props

  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        '& .markdown': {
          py: 3
        },
        borderRadius: '4px'
      }}
      style={{ backgroundColor: theme.cardColor, padding: '2rem' }}
    >
      <Typography variant='h6' gutterBottom>
        {title}
      </Typography>
      <Divider />
      {posts.map((post) => (
        <React.Fragment key={post.substring(0, 40)}>
          <Markdown className='markdown'>{post}</Markdown>
          <Divider />
        </React.Fragment>
      ))}
    </Grid>
  )
}

export default Main
