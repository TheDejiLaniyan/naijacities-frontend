import { NavDropdown, Nav }  from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGear} from "@fortawesome/free-solid-svg-icons"
import {  useNavigate, useLocation} from 'react-router-dom'
import {  useState } from 'react'
import useAuth from '../../hooks/useAuth'
import NewUserModal from '../../features/users/NewUserModal'
import NewCityForm from '../../features/cities/NewCityForm';
// import NewCityModal from '../../features/cities/NewCityModal'
const USERS_REGEX = /^\/naijacities\/u\/users(\/)?$/


function NavBarDropdown() {

    const [newUserShow, setNewUserShow] = useState(false);
    const [editUserShow, setEditUserShow] = useState(false);
    const [newCityShow, setNewCityShow] = useState(false)

    const navigate = useNavigate()
  const { isTier2, isTier3 } = useAuth()

  const { pathname } = useLocation()


const onNewCityClicked = ()=>{
  navigate('/naijacities/u/cities/new')
}

    let newUserButton = null
    if(isTier3){
     newUserButton = (
         <p>
             <p className=''
                     onClick={()=> setNewUserShow(true)}>
                 New User
             </p>
         </p>
       )
    }
 
   let userButton = null
   if (isTier3) {
       if (!USERS_REGEX.test(pathname) && pathname.includes('/naijacities/u')) {
           userButton = (
              <>
                 <p className=""
                   onClick={() => navigate('/naijacities/u/users')} >
                     Users
                 </p>
              </>
           )
       }
   }

   const NewCityButton = (
    <p className='' onClick={onNewCityClicked}>
        Add New Cities
    </p>
  )
  return (
    <>
        
    <Nav>
            <NavDropdown
            className='icon-button'
              id="nav-dropdown-dark-example"
              menuVariant="dark"
              title={
               <FontAwesomeIcon icon={faGear}/>
            }
            >
                
              <NavDropdown.Item href="#action/3.1">{newUserButton}</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                {NewCityButton}
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">{userButton}</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
          </Nav>

          <NewUserModal show={newUserShow} onHide={() => setNewUserShow(false)} />
            <NewCityModal show={newCityShow} onHide={()=> setNewCityShow(false)}/>
        {/* <DropdownButton id="dropdown-basic-button"
        title={
               <FontAwesomeIcon icon={faGear}/>
            } >
       <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
       <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
       <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    </DropdownButton> */}
    </>
  );
}

export default NavBarDropdown;