import {  useDeleteCityMutation } from "./citiesApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan, faHouse } from "@fortawesome/free-solid-svg-icons"
import React, { useState, useEffect } from "react"
import { Button, Modal } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import NavBar from "../../components/NavBar"
import ImageCarousel from "./components/Carousels"
import useAuth from "../../hooks/useAuth"

const CityViewForm = ({city}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {username, status} = useAuth()
    const navigate = useNavigate()
    
    const onGoHomeClicked = () => navigate('/naijacities/u/cities')

    const  goHomeButton = (
          <button
              className="dash-footer__button icon-button"
              title="Home"
              onClick={onGoHomeClicked}
          >
              <FontAwesomeIcon icon={faHouse} />
          </button>
      )

    const fileHandler = e =>{
        console.log(e)
    }

    const [deleteCity, {
        isSuccess,
        isError,
        error
    }] = useDeleteCityMutation()

    const handleEdit = ()=> navigate(`/naijacities/u/cities/${city.id}/edit`)
    
  const onDeleteCityClicked = async () => {
    await deleteCity({ id: city.id })
    navigate('/naijacities/u/cities')
}

    const content = (
        <>
            <NavBar/>
            <div className="body">
                <main className="city-view__main">
                    <h1 className="">{city.name} </h1>
                    <div className="city__action-buttons">
                        <button onClick={handleEdit} className='icon-button' >
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                        <button
                            className="icon-button delete-button"
                            title="Delete"
                            onClick={handleShow}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                    
                    <section className="city-carousel__body">
                        <ImageCarousel city={city}/>
                    </section>
                </main> 
                <section>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed numquam ea temporibus molestias, dolor laboriosam minus eveniet, quis molestiae incidunt quidem illum harum aliquid doloremque enim qui error odio! Fugit?
                  </p>
                  </section>   
                <footer className="city-view__footer mx-3">
                    
                    {goHomeButton}
                </footer>
            </div>            

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
