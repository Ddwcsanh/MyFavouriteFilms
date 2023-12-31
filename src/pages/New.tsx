/* eslint-disable import/no-webpack-loader-syntax */
import * as React from 'react'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import { ThemeContext } from '~/contexts/ThemeContext'
import MainNewsFeature from '~/components/news/MainNewsFeature'
import FeaturedPost from '~/components/news/FeaturedPost'
import Main from '~/components/news/Main'
import Sidebar from '~/components/news/Sidebar'
import post1 from '~/components/news/markdown/blog-post.1.md'
import post2 from '~/components/news/markdown/blog-post.2.md'
import post3 from '~/components/news/markdown/blog-post.3.md'

const mainFeaturedPost = {
  title: 'Title of a longer featured news',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://source.unsplash.com/random?wallpapers',
  imageText: 'main image description',
  linkText: 'Continue reading…'
}

const featuredPosts = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    description: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text'
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text'
  }
]

const posts = [post1, post2, post3]

const sidebar = {
  title: 'About',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' }
  ]
}

// TODO remove, this demo shouldn't need to reset the theme.
export default function News() {
  const { theme } = React.useContext(ThemeContext)
  return (
    <Container maxWidth='xl' sx={{ padding: '2rem 0' }}>
      <main>
        <MainNewsFeature post={mainFeaturedPost} />
        <Grid container spacing={4}>
          {featuredPosts.map((post) => (
            <FeaturedPost key={post.title} post={post} />
          ))}
        </Grid>
        <Grid container spacing={4} sx={{ mt: 4 }} style={{ color: theme.color }} margin={0} width={'100%'}>
          <Main title='From the firehose' posts={posts} />
          <Sidebar title={sidebar.title} description={sidebar.description} archives={sidebar.archives} />
        </Grid>
      </main>
    </Container>
  )
}
