import { useGetUsersQuery } from "./usersApiSlice"
import User from './User'
import NavBar from "../../components/NavBar"
import Footer from "../../components/Footer"
import useAuth from "../../hooks/useAuth"

const UsersList = () => {

    const {isTier3} = useAuth()
    const {
        data: users, isLoading, isSuccess, isError, error
    } = useGetUsersQuery(undefined, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids } = users

        const tableContent = ids?.length
            ? ids.map(userId => <User key={userId} userId={userId} />)
            : null

        content = (
           <>
            <div className="body">
            <NavBar/>
                 <div className="users-list__body">
                 <table className="table table--users ">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th user__username">Username</th>
                        <th scope="col" className="table__th user__roles">Roles</th>
                        <th scope="col" className="table__th user__edit">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
                 </div>
            <Footer/>
            </div>
           </>
        )
    }

    return content
}
export default UsersList