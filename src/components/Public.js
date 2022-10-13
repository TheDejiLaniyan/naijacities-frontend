import { Link } from "react-router-dom";
import { Button, Row, Col } from 'react-bootstrap'
import LoginModal from './LoginModal'
import RegisterModal from "./RegisterModal";
import { useState } from "react";


const Public = () => {

    
    const [loginShow, setLoginShow] = useState(false);
    const [registerShow, setRegisterShow] = useState(false);

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(date)

    const content = (
            <>
        <div className="body">
        <div className="public__body">
            <header className="public__header">
                <Row className="justify-content-md-center">
                    <Col xs lg='2'>
                        <p>
                            <Link className=' nav-link' onClick={() => setLoginShow(true)}>
                                Login
                            </Link>
                        </p>
                    </Col>
                    <Col md='auto'>
                    <p>
                            <Link className=' nav-link' onClick={() => setRegisterShow(true)}>
                                Register
                            </Link>
                        </p>
                    </Col>
                    <Col xs lg='2'>
                        <p className="nav-link mx-2">About</p>
                    </Col>
                </Row>
            </header>
            <LoginModal show={loginShow} onHide={() => setLoginShow(false)} />
            <RegisterModal show={registerShow} onHide={() => setRegisterShow(false)} />
            <Row>
                <Col md={{span:6, offset:3}} >
                    <main className="public__main p-4 ">
                        <h3 className="public__title">Welcome to Naija Cities</h3>    
                        <article className='mb-3'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam aliquam officiis quis repudiandae quas unde expedita voluptate dolorum fugit. A nesciunt modi cupiditate voluptate voluptates repellat sunt, similique veniam ipsam.
                        </article>
                        <Button className='public__button'
                                href='/naijacities/cities'>
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

export default Public
