import { Link } from "react-router-dom";
import { Button, Row, Col } from 'react-bootstrap'
import LoginModal from '../features/auth/LoginModal'
import RegisterModal from "../features/auth/RegisterModal";
import { useState } from "react";


const PublicHomePage = () => {

    
    const [loginShow, setLoginShow] = useState(false);
    const [registerShow, setRegisterShow] = useState(false);

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(date)

    const content = (
            <>
        <div className="body">
        <div className="public__body">
            <header className="public__header">                    
                        <p className='nav-link nav-link-padding' onClick={() => setLoginShow(true)}>
                                Login
                        </p>
                    
                    
                    <p className='nav-link nav-link-padding' onClick={() => setRegisterShow(true)}>
                                Register
                        </p>
                    <p className="nav-link nav-link-padding">About</p>
            </header>
            <LoginModal show={loginShow} onHide={() => setLoginShow(false)} />
            <RegisterModal show={registerShow} onHide={() => setRegisterShow(false)} />
            <Row>
                <Col  className='public__container' >
                    <main className="public__main p-4 ">
                        <h3 className="public__title">Welcome to Naija Cities</h3>    
                        <article className='mb-3 public__article'>
                        <p>Your No. 1 website for information regarding Nigerian Cities</p>
                        </article>
                        <Button className='public__button'
                                href='/cities'>
                            View Cities
                        </Button>
                        <br />
                        
                    </main>
                </Col>
            </Row>
           
        </div>
       
            <footer className='public__footer'>
                <Row>
                    <Col className="mx-5">
                        <h4 className="">{today}</h4>
                    </Col>
                </Row>
            </footer>
      </div>
              
            </>
        
         )
  
  return content
}

export default PublicHomePage
