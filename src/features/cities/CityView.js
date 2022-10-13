import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCityById } from './citiesApiSlice'
import CityViewForm from './CityViewForm'

const CityView = () => {
    const { id } = useParams()

    const city = useSelector(state => selectCityById(state, id))

    const content = city ? <CityViewForm city={city}  /> : <p>Loading...</p>

    return content
}

export default CityView
