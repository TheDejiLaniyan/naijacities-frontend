import { useState, useEffect } from "react"
import { useAddNewCityMutation } from "./citiesApiSlice"
import { useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import states from '../../config/states'
import { Form, Button, Image } from "react-bootstrap"
import 'react-toastify/dist/ReactToastify.css';
import NavBar from "../../components/NavBar"
import Footer from '../../components/Footer'
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const NewCityForm = ({users}) => {
  const [addNewCity, {
    isLoading,
    isSuccess,
    isError,
    error
}] = useAddNewCityMutation()

const navigate = useNavigate()
const [name, setName] = useState('')
const [state, setState] = useState('')
const {username} = useAuth()
const [cityImages, setCityImages] = useState('')
// const [author, setAuthor] = useState('')
// const author = username

useEffect(() => {
  if (isSuccess) {
      setState('')
      setName('')
      setCityImages('')
      navigate('/u/cities')
  }
}, [isSuccess, navigate])



const onNameChanged = e => setName(e.target.value)
const onStateChanged = e => setState(e.target.value)

const author = username

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

 
const canSave = [ name, state, cityImages, author ] && !isLoading


const handleSubmit = async (e) => {
    e.preventDefault()
    if (canSave) {
        try{
          await addNewCity({ name, state, images:cityImages, author  })
        }catch(error){
          console.log(error)
          toast.error(error)
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
              <ToastContainer autoClose={5000}/>
              <h1>New City</h1>
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

              {/* 
              <Form.Control
                id="state"
                type='text'
                name="state"
                value={state}
                required
                onChange={onStateChanged}
                aria-describedby="passwordHelpBlock"
              /> */}

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
                <Button variant='success' onClick={()=>navigate('/u/cities')}>
                  Back
                </Button>
            </Form> 
           </div>
           <Footer/>
          </div>
      </>
    
    )
}

export default NewCityForm

