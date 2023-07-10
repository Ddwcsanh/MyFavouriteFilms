/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import useListOfFilms from '~/api/useListOfFilms'
import { Film } from '~/global/interface'

export type DataContextType = {
  films: Film[]
  setFilms: React.Dispatch<React.SetStateAction<Film[]>>
  loading: boolean
}

export const DataContext = React.createContext<DataContextType | null>(null)

interface Props {
  children: React.ReactNode
}
const DataProvider = ({ children }: Props) => {
  const [films, setFilms] = React.useState<Film[]>([])
  const { getFilms } = useListOfFilms()
  const [loading, setLoading] = React.useState<boolean>(true)

  const fetchFilms = async () => {
    const response = await getFilms()
    setFilms(response)
    setLoading(false)
  }

  React.useEffect(() => {
    fetchFilms()
  }, [getFilms])

  const value: DataContextType = {
    films,
    setFilms,
    loading
  }
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export default DataProvider

export const useData = () => {
  return React.useContext(DataContext) as DataContextType
}
