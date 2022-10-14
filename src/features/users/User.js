import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'
import useAuth from '../../hooks/useAuth'
import EditUserModal from './EditUserModal'

import React from 'react'


const User = ({userId}) => {

    const user = useSelector(state => selectUserById(state, userId))
    const {isTier3} = useAuth()
    const [editUserShow, setEditUserShow] = useState(false);

    const navigate = useNavigate()

    if (user) {
        const handleEdit = () => {
            navigate(`/u/users/${userId}`)
        }

        // let editButton = null
        // if(isTier3 ){
        //     editButton = (
        //         <button
        //             className='icon-button-black mx-3'
        //             title='Edit Users'
        //             onClick={handleEdit}>
        //         <FontAwesomeIcon icon={faPenToSquare}/>
        //     </button>
        //     )
        // }

        let editButton = null
        if(isTier3 ){
            editButton = (
                <button
                    className='icon-button-black mx-3'
                    title='Edit Users'
                    onClick = {handleEdit}>
                <FontAwesomeIcon icon={faPenToSquare}/>
            </button>
            )
        }

        const userRolesString = user.roles.toString().replaceAll(',', ', ')

        // const cellStatus = user.active ? '' : 'table__cell--inactive'
  return (
    <>
    <tr className="table__row user">
    <td className={`table__cell `}>{user.username}</td>
    <td className={`table__cell `}>{userRolesString}</td>
    <td className={`table__cell `}>
        {editButton}
        <EditUserModal show={editUserShow} userId={userId} onHide={()=> setEditUserShow(false)} />
    </td>
    </tr>
    </>
  )
} else return null
}

export default User