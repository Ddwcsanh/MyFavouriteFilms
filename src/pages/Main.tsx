import FilmsPresentation from '~/components/FilmsPresentation'
import Loading from './Loading'
import { useData } from '~/contexts/DataContext'

export default function Main() {
  const { loading, films } = useData()
  return loading ? <Loading /> : <FilmsPresentation films={films} />
}
