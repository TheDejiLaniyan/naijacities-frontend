import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBackward, faHouse } from "@fortawesome/free-solid-svg-icons"
import { useNavigate, useLocation } from 'react-router-dom'
import useAuth from "../hooks/useAuth"

const Footer = () => {
    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)
    
    const {username, status} = useAuth()
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const onGoBackClicked = () => navigate(-1)

   
    let goBackButton = null
    if (pathname !== '/') {
        goBackButton = (
            <button
                className="dash-footer__button icon-button"
                title="Back"
                onClick={onGoBackClicked}
            >
                <FontAwesomeIcon icon={faBackward} />
            </button>
        )
    }
    
    
    const content = (
        <footer className="footer" >
           
            <>
            <div className="mx-3 hidden__footer">
            {goBackButton}
            </div>
            <div className="mx-3 hidden__footer">
            <p>Current User: {username}</p>            
            </div>
            <div className="mx-3 hidden__footer">
            <p>Status: {status}</p>
            </div>
            <div className="mx-3 hidden__footer">
            <p><p>Date: {today}</p></p>
            </div>
            </>
            </footer>
    )
    return content
}

export default Footer