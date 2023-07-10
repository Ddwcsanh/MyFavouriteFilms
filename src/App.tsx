import { Route, Routes } from 'react-router-dom'
import './App.css'
import { routes } from './routes/routes'
import { useContext } from 'react'
import { ThemeContext } from './contexts/ThemeContext'
import AuthContextProvider from './contexts/AuthContext'
import DataProvider from './contexts/DataContext'

const App = () => {
  const { theme } = useContext(ThemeContext)

  return (
    <AuthContextProvider>
      {/* <ColorModeContext.Provider value={colorMode}> */}
      <DataProvider>
        <div style={{ backgroundColor: theme.backgroundColor }}>
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} Component={route.component}>
                {route.children?.map((child, index) => (
                  <Route key={index} path={child.path} Component={child.component}>
                    {child.childrens?.map((child, index) => (
                      <Route key={index} path={child.path} Component={child.component} />
                    ))}
                  </Route>
                ))}
              </Route>
            ))}
          </Routes>
        </div>
      </DataProvider>
      {/* </ColorModeContext.Provider> */}
    </AuthContextProvider>
  )
}

export default App
