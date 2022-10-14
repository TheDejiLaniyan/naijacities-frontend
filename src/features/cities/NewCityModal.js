import { useState, useEffect } from "react"
import { useAddNewCityMutation } from "./citiesApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faX } from "@fortawesome/free-solid-svg-icons"
import { Modal, Button, Container, Image } from "react-bootstrap"
import {toast} from 'react-toastify'

import React from 'react'

const NewCityModal = (props) => {
    const [addNewCity, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewCityMutation()
    
    const [show, setShow] = useState(false);
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [state, setState] = useState('')
    const [images, setImages] = useState([])
    const [imagePreview, setImagePreview] = useState([])
    
    useEffect(()=>{
        setShow(true)
    },[])
    
    const handleClose = () => setShow(false)    
    useEffect(() => {
        if (isSuccess) {
            setName('')
            setState('')
            setImages('')
            setImagePreview('')
            navigate('/naijacities/u/cities') 
        }
    }, [isSuccess, navigate])

    
    const onNameChanged = e => setName(e.target.value)
    const onStateChanged = e => setState(e.target.value)
    // function previewFiles (images){
    //     const reader = new FileReader()
    //     reader.readAsDataURL(images) //this collects the data url that was sent and processes it as an image
    //     reader.onloadend = () =>{
    //         setImagePreview(reader.result)
    //         // console.log(reader.result)
    //     }
    // }
    // const onFileChanged = e => {
    //     const file = e.target.files[0]
    //     console.log(file)
    //     setImages(file)
    //     previewFiles(file)
        
    // }

    const canSave = [ name, state] && !isLoading

    const onSaveCityClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewCity({ name, state  }) //images
            if(isSuccess){
                setShow(false)
                toast.success('City Created Successfully!')
            } else{
                console.log(error)
            }
        }
    }


    const errClass = isError ? "errmsg" : "offscreen"

    
  return (
    <>
      <Modal onHide={handleClose} {...props}>
        <Modal.Header>
          <Modal.Title>New City</Modal.Title>
          <div className="form__action-buttons">
                        <button
                            className=""
                            title="Save"
                            onClick={handleClose}
                        >
                            <FontAwesomeIcon icon={faX} />
                        </button>
                    </div>
        </Modal.Header>
        <Modal.Body>
        <Container>
        <form className="form" onSubmit={onSaveCityClicked} encType="multipart/form-data" >
                <div className="form__title-row">
                    <h2 className="offset-4">New City</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            // disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="name">
                    Name: </label>
                <input
                    className={`form__input`}
                    id="name"
                    name="name"
                    type="text"
                    autoFocus
                    required
                    autoComplete="off"
                    value={name}
                    onChange={onNameChanged}
                />

                <label className="form__label" htmlFor="state">
                    State:  </label>
                <input
                    className={`form__input `}
                    id="state"
                    name="state"
                    type="state"
                    value={state}
                    required
                    onChange={onStateChanged}
                />

                {/* <label className="form__label" htmlFor="images">
                    Images</label>
                <input type="file" 
                       name="images" 
                    //    id="images"
                       required
                       accept="image/png, image/jpg, image/jpeg, image/jfif"
                       onChange={onFileChanged}
                        />
            <Image style={{width:40, height:40}}
                   thumbnail 
                   src={imagePreview}   /> */}
            </form>
        </Container>
        </Modal.Body>
        <Modal.Footer>
        <Button onClick={onSaveCityClicked}
         style={{backgroundColor: '#000', borderColor:'#000'}}
         className='modal__button'>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );

}

export default NewCityModal
