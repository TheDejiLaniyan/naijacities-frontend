import { useState, useEffect } from "react"
import { useAddNewCityMutation } from "./citiesApiSlice"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import { Form, Button, Image } from "react-bootstrap"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from "../../components/NavBar"


const NewCityForm = () => {
  const [addNewCity, {
    isLoading,
    isSuccess,
    isError,
    error
}] = useAddNewCityMutation()

const successToast = () =>{
  toast.success('Success!')
} 
const errorToast = () =>{
  toast.error('Error!')
}
const navigate = useNavigate()
const [name, setName] = useState('')
const [state, setState] = useState('')
const [cityImages, setCityImages] = useState('')

useEffect(() => {
  if (isSuccess) {
      setState('')
      setName('')
      setCityImages('')
      navigate('/naijacities/u/cities')
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
 

const canSave = [ name, state, cityImages ] && !isLoading


const handleSubmit = async (e) => {
    e.preventDefault()
    if (canSave) {
        try{
          await addNewCity({ name, state, images:cityImages })
          successToast()
        }catch(error){
          console.log(error)
          errorToast()
        }
    }
}


const errClass = isError ? "errmsg" : "offscreen"

  return (
      <>
          <div className="body d-flex justify-content-center">
            <NavBar/>
           <div className="form-container">
           <Form onSubmit={handleSubmit} className='form'>
              <h1>New User</h1>
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
              <Form.Control
                id="state"
                type='text'
                name="state"
                value={state}
                required
                onChange={onStateChanged}
                aria-describedby="passwordHelpBlock"
              />

              <label>Images</label>
              <input
              id="images"
              type="file" 
              name="images" 
              required
              accept="image/*"
              onChange={onFileChanged} />

              <section>
                {cityImages ? <>
                  <Image style={{width:40, height:40}}
                          src={cityImages} alt='Image Preview'   />
                </> : <p>Image Preview</p>}
              </section>

            <Button variant="primary" type="submit" onClick={handleSubmit} >
              Submit
            </Button>
                <ToastContainer/>
                <Button variant='success' onClick={()=>navigate('/naijacities/u/cities')}>
                  Back
                </Button>
            </Form> 
           </div>
          </div>
      </>
    
    )
}

export default NewCityForm

