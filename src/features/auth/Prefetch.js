import { store } from '../../app/store'
import { usersApiSlice } from '../users/usersApiSlice';
import { citiesApiSlice } from '../cities/citiesApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
    useEffect(() => {
        console.log('subscribing')
        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())
        const cities = store.dispatch(citiesApiSlice.endpoints.getCities.initiate())

        return () => {
            console.log('unsubscribing')
            users.unsubscribe()
            cities.unsubscribe()
        }
    }, [])

    return <Outlet />
}
export default Prefetch