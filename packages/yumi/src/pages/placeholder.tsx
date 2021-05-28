import { useLocation, useParams } from 'react-router-dom'
export const PlaceHolderPage = () => {
  const { pathname } = useLocation()

  return <span>{pathname}</span>
}
