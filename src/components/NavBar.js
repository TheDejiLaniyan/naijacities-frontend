import {Image} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faRightFromBracket, faHouse} from "@fortawesome/free-solid-svg-icons"
import {  useNavigate, useLocation, Link } from 'react-router-dom'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import { useEffect, useState } from 'react'
import LoginModal from '../features/auth/LoginModal'
import RegisterModal from "../features/auth/RegisterModal";
import NavBarDropdown from './minorComponents/NavBarDropdown'
import img from './nigeriamap.png'

const NavBar = () => {

    const [registerShow, setRegisterShow] = useState(false);
    const [loginShow, setLoginShow] = useState(false);
    const onGoHomeClicked = () => navigate('/u')
   

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
        navigate('/')
      } 
    }, [isSuccess, navigate])
    

  const onLogoutClicked = () => {
    sendLogout()
    navigate('/')
  }

  let goHomeButton = null
  if (pathname !== '/') {
      goHomeButton = (
          <button
              className="dash-footer__button icon-button"
              title="Home"
              onClick={onGoHomeClicked}
          >
              <FontAwesomeIcon icon={faHouse} />
          </button>
      )
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
  if(pathname.includes('/u')){
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
            {/* <Image 
                        src={img}
                        className='px-5'
                        alt='Nigerian Flag'
                        width="70" height="64"/> */}
                        {goHomeButton}

                    {/* <strong style={{color: 'white'}} 
                              className='brand-button'
                              onClick={()=> navigate('/u')}>
                                NaijaCities</strong> */}
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
