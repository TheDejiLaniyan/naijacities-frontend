import { useState, useEffect } from "react"
import { useUpdateCityMutation, useDeleteCityMutation } from "./citiesApiSlice"
import { useNavigate } from "react-router-dom"
import { Button,Image, Form } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from "../../components/NavBar"
import states from "../../config/states"
import Footer from "../../components/Footer"

const EditCityForm = ({city}) => {
    const [updateCity, {
      isLoading,
      isSuccess,
      isError,
      error
    }] = useUpdateCityMutation()


    const navigate = useNavigate()

    const [name, setName] = useState(city.name)
    const [state, setState] = useState(city.state)
    const [cityImages, setCityImages ] = useState('')

    useEffect(() => {

      if (isSuccess ) {
          setName('')
          setState('')
          setCityImages('')
          navigate(`/u/cities`)
      }

  }, [isSuccess, navigate])

  const onNameChanged = e => setName(e.target.value)
  const onStateChanged = e => setState(e.target.value)
  const onFileChanged = (e) => {
    const file = e.target.files[0]
    previewFiles(file)
  }
  
  const previewFiles = (file)=>{
      const reader = new FileReader()
      if(file){
      reader.readAsDataURL(file) //this collects the data url that was sent and processes it as an image
      reader.onloadend = () =>{
          setCityImages(reader.result)
      }
    } else {
      setCityImages('')
    }
  }

  const onSaveCityClicked = async (e) =>{
    e.preventDefault()
    try{
      if(cityImages){
        await updateCity({id:city.id, name, state, images:cityImages })
      }else{
        await updateCity({id:city.id, name, state })
      }
    }catch(err){
        console.log(err)
    }
  }


  return (
    <>
        <div className="body d-flex justify-content-center">
          <NavBar/>
          <div className="form-container">
          <Form onSubmit={onSaveCityClicked} className='form'>
            <h1>Edit City</h1>
            <Form.Label htmlFor="inputPassword5">City Name</Form.Label>
            <Form.Control
              id="name"
              name="name"
              type="text"
              autoFocus
              required
              autoComplete="off"
              value={name}
              onChange={onNameChanged}
              aria-describedby="cityNameHelpBlock"
            />

            <Form.Label htmlFor="inputPassword5">City State </Form.Label>
            <select name="state" id="state" value={state} onChange={onStateChanged}>
              {
                states.map((state)=>(
                  <option>{state.state}</option>
                ))
              }
              </select>

            <label>Images</label>
            <input
            id="images"
            type="file" 
            name="images" 
            accept="image/*"
            onChange={onFileChanged} />

            <section>
              {cityImages ? <>
                <Image style={{width:40, height:40}}
                        src={cityImages} alt='Image Preview'   />
              </> : <p>Image Preview</p>}
            </section>

          <Button variant="primary" type="submit" onClick={onSaveCityClicked} >
            Submit
          </Button>
              <ToastContainer/>
              <Button variant='success' onClick={()=>navigate('/u/cities')}>
                Back
              </Button>
          </Form> 
          <Footer/>
          </div>
        </div>
    </>
    )
}

export default EditCityForm