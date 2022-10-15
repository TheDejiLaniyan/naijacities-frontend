import {  useDeleteCityMutation } from "./citiesApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan, faHouse, faLink } from "@fortawesome/free-solid-svg-icons"
import React, { useState } from "react"
import { Button, Modal, Image } from "react-bootstrap"
import { useNavigate, Link } from "react-router-dom"
import NavBar from "../../components/NavBar"
import ImageCarousel from "./components/Carousels"
import useAuth from "../../hooks/useAuth"
import Footer from "../../components/Footer"

const CityViewForm = ({city}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {isTier2, isTier3} = useAuth()
    const navigate = useNavigate()
    
    const onGoHomeClicked = () => navigate('/u/cities')

    const  goHomeButton = (
          <button
              className="dash-footer__button icon-button"
              title="Home"
              onClick={onGoHomeClicked}
          >
              <FontAwesomeIcon icon={faHouse} />
          </button>
      )

      
      const [deleteCity, {
        isSuccess,
        isError,
        error
      }] = useDeleteCityMutation()
      
      const handleEdit = ()=> navigate(`/u/cities/${city.id}/edit`)
      
      const onDeleteCityClicked = async () => {
        await deleteCity({ id: city.id })
        navigate('/u/cities')
      }
      
      const editCityButton = (
        <button onClick={handleEdit} className='icon-button' >
        <FontAwesomeIcon icon={faPenToSquare} />
    </button>
    
      )
  
      const deleteCityButton = (
        <button
        className="icon-button delete-button"
        title="Delete"
        onClick={handleShow}
    >
        <FontAwesomeIcon icon={faTrashCan} />
    </button>
      )

      let reviseContent = null
      if(isTier2 || isTier3){
        reviseContent = (
          <>
            {editCityButton}
            {deleteCityButton}
          </>
        )
      }

    const content = (
        <>
            <NavBar/>
            <div className="body">
                <main className="city-view__main">
                    <h1 className="">{city.name} </h1>
                    <div className="city__action-buttons">
                       {reviseContent}
                    </div>
                    
                    <section className="city-carousel__body-A" >
                        {/* <ImageCarousel city={city}/> */}
                        <Image src={city.images?.url} />
                    </section>
                    <section className="city-carousel__body-B">
                        <div>
                          <Link className="nav-link" href='#'>
                            <FontAwesomeIcon className="px-2" icon={faLink}/>
                            Brief History</Link>
                          <Link className="nav-link" href='#'>
                            <FontAwesomeIcon className="px-2" icon={faLink}/>
                            Top Locations</Link>
                        </div>
                    </section>
                </main> 
                <section>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed numquam ea temporibus molestias, dolor laboriosam minus eveniet, quis molestiae incidunt quidem illum harum aliquid doloremque enim qui error odio! Fugit?
                  </p>
                  </section>   
            </div>            
            <Footer/>

            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete City</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to DELETE city?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={onDeleteCityClicked}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    )

  return content
}

export default CityViewForm
