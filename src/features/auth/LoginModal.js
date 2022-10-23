import { useRef, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../features/auth/authSlice'
import { useLoginMutation } from '../../features/auth/authApiSlice'
import usePersist from '../../hooks/usePersist';
import { Button, Modal, Container } from 'react-bootstrap';
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useFormik} from 'formik'
import { loginSchema } from '../../Schemas/loginSchema'


function LoginModal(props) {

    const location = useLocation()
    const [show, setShow] = useState(false);
    const [persist, setPersist] = usePersist()
    const userRef = useRef()  
    const errRef = useRef()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login] = useLoginMutation()

    useEffect(()=>{
            setShow(true)
    },[])


    const onSubmit = async (values, actions)=>{
        try{
            const { accessToken } = await login(values).unwrap()
            dispatch(setCredentials({ accessToken }))
            navigate(`/u${location.pathname}`)
            actions.resetForm()
        }catch(err){

        }
    }

    const handleToggle = () => setPersist(prev => !prev)
    const {values, isSubmitting, setSubmitting, handleBlur, errors, handleChange, touched, handleSubmit} = useFormik({
        initialValues:{
            username:"",
            password:""
         },
        validationSchema: loginSchema,
        onSubmit
    })


    if (isSubmitting) return <p>Loading...</p>
  return (
    <Modal {...props}  aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Login
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="">
        <Container>
        <main className="login">
                <form className="form " onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input
                        className={errors.username ? 'input-error' : 'form__input'}
                        type="text"
                        id="username"
                        ref={userRef}
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="off"
                        autoFocus
                        required
                    />
                    {errors.username && touched.username && <p className='input-feedback'>{errors.username}</p>}

                    <label htmlFor="password">Password:</label>
                    <input
                        className={errors.password ? 'input-error' : 'form__input'}
                        type="password"
                        id="password"
                        onChange={handleChange}
                        value={values.password}
                        onBlur={handleBlur}
                        required
                    />
                    {errors.password && touched.password && <p className='input-feedback'>{errors.password}</p>}
                    <div className='d-flex justify-content-center align-items-center'>
                        <button className="form__submit-button mb-3" disabled={isSubmitting}>
                            Sign In</button>
                    </div>

                    <label htmlFor="persist" className="form__persist">
                        <input
                            type="checkbox"
                            className="form__checkbox"
                            id="persist"
                            onChange={handleToggle}
                            checked={persist}
                        />
                        Remember Me
                    </label>
                </form>
            </main>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LoginModal