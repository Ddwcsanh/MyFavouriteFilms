import About from '~/pages/About'
import Detail from '~/pages/Detail'
import Main from '~/pages/Main'
import Contact from '~/pages/Contact'
import Layout from '~/pages/Layout'
import Login from '~/pages/Login'
import News from '~/pages/New'
import Test from '~/pages/Test'
import ProtectedLayout from '~/pages/private/ProtectedLayout'
import Profile from '~/pages/private/Profile'
import FilmManagement from '~/pages/private/FilmManagement'

export const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        component: Main
      },
      {
        path: '/detail/:id',
        component: Detail
      },
      {
        path: '/about',
        component: About
      },
      {
        path: '/news',
        component: News
      },
      {
        path: '/contact',
        component: Contact
      },
      {
        path: '/profile',
        component: ProtectedLayout,
        childrens: [
          {
            path: '/profile',
            component: Profile
          }
        ]
      },
      {
        path: '/film-mng',
        component: ProtectedLayout,
        childrens: [
          {
            path: '/film-mng',
            component: FilmManagement
          }
        ]
      }
    ]
  },
  {
    path: '/test',
    component: Test
  }
]
