import {Route, Routes} from 'react-router-dom'
import UsersList from './features/users/UsersList'
import Layout from './components/Layout'
import Prefetch from './features/auth/Prefetch';
import PersistLogin from './features/auth/PersistLogin'
import RequireAuth from './features/auth/RequireAuth';
import {ROLES} from './config/roles'
import './index.css'
import DashLayout from './components/DashLayout'
import Public from './components/Public'
import Welcome from './components/Welcome'
import CitiesHome from './features/cities/CitiesHome';
import NewCityForm from './features/cities/NewCityForm';
import CityView from './features/cities/CityView';
import EditCity from './features/cities/EditCity'
import EditUser from './features/users/EditUser'

const App = () => (
  <>
   
        <Routes>
          <Route path='/' element={<Layout/>}>
            {/* public routes */}
            <Route index element={<Public/>}/>
            <Route path='cities'>
              <Route index element={<CitiesHome/>}/>
              <Route path=':id' >
                <Route index element={<CityView/>}/>
              </Route>
            </Route>
              {/* protected routes */}
             <Route element={<PersistLogin/>} >
                <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]}/>}>
                  <Route element={<Prefetch/>}>

                      <Route path='u' element={<DashLayout/>}>
                        <Route index element ={<Welcome/>}/>
                        <Route element={<RequireAuth allowedRoles={[ROLES.Tier2, ROLES.Tier3]}/>}/>
                        
                        <Route path='users'>
                          <Route index element={<UsersList/>}/>
                          <Route path=':id' element={<EditUser/>}/>
                        </Route>

                        <Route path='cities'>
                          <Route index element={<CitiesHome/>}/>
                          <Route path='new' element={<NewCityForm/>}/>
                          <Route path=':id'>
                            <Route index element={<CityView/>}/>
                            <Route path='edit' element={<EditCity/>}/>
                          </Route>
                        </Route>
                      {/* </Route> */}
                    </Route>
                  </Route>
                  </Route> 
              
              </Route>
            
          </Route>
        </Routes>
    

   
  </>
);

export default App