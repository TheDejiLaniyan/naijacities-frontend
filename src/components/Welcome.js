import Footer from "./Footer";
import useAuth from "../hooks/useAuth";
import { Button, Row, Col } from 'react-bootstrap'
import NavBar from "./NavBar";

const Welcome = () => {

    

    const {username, isTier2, isTier3} = useAuth()

    const content = (
       
        <>
            <div className="body">
        <NavBar/>
            <div className="welcome__body">
            <Row >
                <Col >
                <main className="welcome__main p-4 ">
                    <h1>Welcome to Naija Cities</h1>
                    <article className='mb-3'>
                        <p>Your No. 1 website for information regarding Nigerian Cities</p>
                    </article>
                    <Button className='welcome__button'
                            href="/u/cities">
                        View Cities
                    </Button>
                    <br />
                </main>
                </Col>
            </Row>
       
        </div>
        <Footer className=""/>
            </div>
        </>
         )
  
  return content
}

export default Welcome
