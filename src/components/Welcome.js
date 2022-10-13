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
                <Col md={{span:6, offset:3}}>
                <main className="welcome__main p-4 ">
                    <h1>Welcome to Naija Cities</h1>
                    <article className='mb-3'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam aliquam officiis quis repudiandae quas unde expedita voluptate dolorum fugit. A nesciunt modi cupiditate voluptate voluptates repellat sunt, similique veniam ipsam.
                    </article>
                    <Button className='welcome__button'
                            href="u/cities">
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
