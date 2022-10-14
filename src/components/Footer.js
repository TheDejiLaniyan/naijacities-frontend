import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse } from "@fortawesome/free-solid-svg-icons"
import { useNavigate, useLocation } from 'react-router-dom'
import useAuth from "../hooks/useAuth"

const Footer = () => {
    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)
    
    const {username, status} = useAuth()
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const onGoHomeClicked = () => navigate('/u')

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
    const content = (
        <footer className="welcome__footer mx-3 mb-3" >
           
            <>
            <div className="mx-3">
            {goHomeButton}
            </div>
            <div className="mx-3">
            <p>Current User: {username}</p>            
            </div>
            <div className="mx-3">
            <p>Status: {status}</p>
            </div>
            <div className="mx-3">
            <p><p>Date: {today}</p></p>
            </div>
            
            
            
            
            </>
            </footer>
    )
    return content
}

export default Footer