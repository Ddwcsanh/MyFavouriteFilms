import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { routes } from './routes/routes'
import { useContext } from 'react'
import { ThemeContext, ThemeProvider } from './contexts/ThemeContext'
import AuthContextProvider from './contexts/AuthContext'

const App = () => {
  const { theme } = useContext(ThemeContext)

  return (
    <ThemeProvider>
      <div className='App' style={{ backgroundColor: theme.backgroundColor }}>
        <BrowserRouter>
          <AuthContextProvider>
            {/* <ColorModeContext.Provider value={colorMode}> */}
            {/* <DataProvider> */}
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} Component={route.component}>
                  {route.children?.map((child, index) => (
                    <Route key={index} path={child.path} Component={child.component}>
                      {/* {child.childrens?.map((child, index) => (
                    <Route key={index} path={child.path} Component={child.component} />
                  ))} */}
                    </Route>
                  ))}
                </Route>
              ))}
            </Routes>
            {/* </DataProvider> */}
            {/* </ColorModeContext.Provider> */}
          </AuthContextProvider>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  )
}

export default App
