import { useEffect, useState, createContext, ReactNode } from 'react'

interface Theme {
  backgroundColor: string
  color: string
  primaryColor?: string
  redPrimary?: string
  redDarker?: string
  cardColor?: string
  white?: string
}

interface Themes {
  dark: Theme
  light: Theme
}

interface InitialState {
  dark: boolean
  theme: Theme
  toggle: () => void
}

const themes: Themes = {
  dark: {
    backgroundColor: '#434343',
    color: 'white',
    primaryColor: '#03091B',
    redPrimary: '#D32F2F',
    redDarker: '#962929',
    cardColor: '#03091B',
    white: '#FFFFFF'
  },
  light: {
    backgroundColor: '#e3e3e3',
    color: '#232323',
    primaryColor: '#03091B',
    redPrimary: '#D32F2F',
    redDarker: '#962929',
    cardColor: '#FFFFFF',
    white: '#FFFFFF'
  }
}

const initialState: InitialState = {
  dark: false,
  theme: themes.light,
  toggle: () => {
    null as unknown as void
  }
}

const ThemeContext = createContext<InitialState>(initialState)

interface ThemeProviderProps {
  children: ReactNode
}

function ThemeProvider({ children }: ThemeProviderProps) {
  const [dark, setDark] = useState(false) // Default theme is light

  // On mount, read the preferred theme from the persistence
  useEffect(() => {
    const isDark = localStorage.getItem('dark') === 'true'
    setDark(isDark)
  }, [])

  // To toggle between dark and light modes
  const toggle = () => {
    const isDark = !dark
    localStorage.setItem('dark', JSON.stringify(isDark))
    setDark(isDark)
  }

  const theme = dark ? themes.dark : themes.light

  return <ThemeContext.Provider value={{ theme, dark, toggle }}>{children}</ThemeContext.Provider>
}

export { ThemeProvider, ThemeContext }
