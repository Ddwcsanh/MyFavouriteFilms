import { useContext } from 'react'
import { Container, Typography, Box, Paper } from '@mui/material'
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  timelineItemClasses
} from '@mui/lab'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { ThemeContext } from '~/contexts/ThemeContext'

const AboutUsPage = () => {
  const theme1 = useTheme()
  const isMobile = useMediaQuery(theme1.breakpoints.down('sm'))
  const { theme } = useContext(ThemeContext)
  const timelineData = [
    {
      title: 'Our Journey Begins',
      date: 'March 2018',
      description:
        'We started our company with a small team and a big dream. Our goal was to create innovative solutions for our clients.'
    },
    {
      title: 'Expanding Horizons',
      date: 'August 2019',
      description:
        'We expanded our services and gained recognition in the industry. Our client base grew, and we started working on larger projects.'
    },
    {
      title: 'Reaching New Heights',
      date: 'January 2021',
      description:
        'We achieved significant milestones and received accolades for our work. Our team continued to grow, and we diversified our offerings.'
    },
    {
      title: 'Future Vision',
      date: 'Present',
      description:
        'We are committed to staying at the forefront of technology and innovation. Our focus is on delivering exceptional results and exceeding client expectations.'
    }
  ]

  return (
    <Container style={{ color: theme.color, padding: '2rem 0', minHeight: 'calc(100vh - 64px)' }} maxWidth={'xl'}>
      <Typography variant='h4' align='center' gutterBottom>
        About me
      </Typography>
      <Typography variant='body1' align='center' gutterBottom>
        Welcome to my film playlist! I am a dedicated person of enthusiasm working towards providing top-notch films to
        you.
      </Typography>
      <Timeline
        sx={
          isMobile
            ? {
                [`& .${timelineItemClasses.root}:before`]: {
                  flex: 0,
                  padding: 0
                }
              }
            : {}
        }
        position={isMobile ? 'right' : 'alternate'}
      >
        {timelineData.map((item, index) => (
          <TimelineItem key={index} position={index === 1 || index === 3 ? (isMobile ? 'right' : 'left') : 'right'}>
            <TimelineSeparator>
              <TimelineDot color='error' />
              {index !== timelineData.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Paper
                elevation={3}
                sx={{ padding: '1rem' }}
                style={{
                  backgroundColor: theme.cardColor,
                  color: theme.color
                }}
              >
                <Typography variant='h6' gutterBottom fontWeight={600}>
                  {item.title}
                </Typography>
                <Typography variant='subtitle1' gutterBottom fontWeight={600} style={{ color: theme.redPrimary }}>
                  {item.date}
                </Typography>
                <Typography variant='body1'>{item.description}</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
      <Box mt={4} textAlign='center'>
        <Typography variant='body1'>
          Thank you for choosing us. We look forward to serving you and creating lasting partnerships.
        </Typography>
      </Box>
    </Container>
  )
}

export default AboutUsPage
