import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCityById } from './citiesApiSlice'
import { selectAllUsers } from '../users/usersApiSlice'
import EditCityForm from './EditCityForm'

const EditCity = () => {
    const { id } = useParams()

    const city = useSelector(state => selectCityById(state, id))
    // const users = useSelector(selectAllUsers)

    const content = city  ? <EditCityForm city={city}  /> : <p>Loading...</p>

    return content
}

export default EditCity
