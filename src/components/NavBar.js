import {Image} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
           faRightFromBracket,
       } from "@fortawesome/free-solid-svg-icons"
import {  useNavigate, useLocation, Link } from 'react-router-dom'

import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import { useEffect, useState } from 'react'
import LoginModal from './LoginModal'
import RegisterModal from "./RegisterModal";
import NavBarDropdown from './minorComponents/NavBarDropdown'
// const LOGIN_REGEX = /^\/naijacities(\/)?$/
// const DASH_REGEX = /^\/naijacities\/u(\/)?$/
// const USERS_REGEX = /^\/naijacities\/u\/users(\/)?$/

const NavBar = () => {

    const [registerShow, setRegisterShow] = useState(false);
    const [loginShow, setLoginShow] = useState(false);
   

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [sendLogout, {
      isLoading,
      isSuccess,
      isError,
      error
  }] = useSendLogoutMutation()


  useEffect(() => {
      if (isSuccess){
        navigate('/naijacities')
      } 
    }, [isSuccess, navigate])
    
    // let dashClass = null
    // if ( !USERS_REGEX.test(pathname)) {
    //     dashClass = "dash-header__container--small"
    // }

  const onLogoutClicked = () => {
    sendLogout()
    navigate('/naijacities')
  }

  const logoutButton = (
      <button
          className="icon-button mx-3"
          title="Logout"
          onClick={onLogoutClicked}        >
          <FontAwesomeIcon icon={faRightFromBracket} />
      </button>
  )
 
  const  loginButton = (
    <p>
        <Link className=' nav-link mx-3' onClick={() => setLoginShow(true)}>
            Login
        </Link>
    </p>
  )

  const registerButton = (
    <p>
        <Link className=' nav-link mx-3' onClick={() => setRegisterShow(true)}>
            Register
        </Link>
    </p>
  )

  const errClass = isError ? "errmsg" : "offscreen"

  let loggedInContent
  if (isLoading) {
      loggedInContent = <p>Logging Out...</p>
  } else {
      loggedInContent = (
          <>
                  <NavBarDropdown/>
                 {logoutButton}
          </>
      )
  }

  let notLoggedInContent 
  if(isLoading){
    notLoggedInContent = <p>Loading</p>
  } else{
    notLoggedInContent =(
        <>
            {loginButton}
            {registerButton}
        </>
    )
  }

  let navbarContent
  if(pathname.includes('/naijacities/u')){
    navbarContent = loggedInContent
  } else {
    navbarContent =  notLoggedInContent
  }
  return (
    <>
          <p className={errClass}>{error?.data?.message}</p>

        <header className='navbar-header'>
            <div className='navbar-header__container'>
           <div className='navbar-header__title'>
            <Image 
                        src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Flag-map_of_Nigeria.svg/1279px-Flag-map_of_Nigeria.svg.png'
                        href='/naijacities'
                        className='brand-button px-5'
                        alt='Nigerian Flag'
                        width="70" height="64"/>
                    <strong style={{color: 'white'}}>NaijaCities</strong>
            </div> 
            <nav className='navbar-header__nav'>
                            {navbarContent}  
            </nav>
            <LoginModal show={loginShow} onHide={() => setLoginShow(false)} />
            <RegisterModal show={registerShow} onHide={() => setRegisterShow(false)} />
            </div>
        </header>
                

    </> 

  )
}

export default NavBar
