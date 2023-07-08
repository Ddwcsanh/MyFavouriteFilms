import { useState } from 'react'
import FilmsPresentation from '~/components/FilmsPresentation'
import { Films } from '~/shared/listOfFilms'

const Main = () => {
  const [film] = useState(Films)
  return <FilmsPresentation films={film} />
}

export default Main
