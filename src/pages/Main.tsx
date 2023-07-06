import React, { useState } from 'react'
import FilmsPresentation from '~/components/FilmsPresentation'
import { Films } from '~/shared/listOfFilms'

export default function Main() {
  const [film] = useState(Films)
  return <FilmsPresentation films={film} />
}
