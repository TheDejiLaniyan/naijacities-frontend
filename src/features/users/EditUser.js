import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'
import EditUserForm from './EditUserForm'
import { useState } from 'react'
const EditUser = () => {
    const { id } = useParams()

    const user = useSelector(state => selectUserById(state, id))

    const content = user ? <EditUserForm user={user}  /> : <p>Loading...</p>

    return content
}
export default EditUser
// import { useParams } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import { selectUserById } from './usersApiSlice'
// import EditUserForm from './EditUserForm'

// const EditUser = () => {
//     const { id } = useParams()

//     const user = useSelector(state => selectUserById(state, id))

//     const content = user ? <EditUserForm user={user} /> : <p>Loading...</p>

//     return content
// }
// export default EditUser