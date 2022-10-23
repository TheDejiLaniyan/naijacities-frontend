import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useRegisterMutation } from './authApiSlice'
import {  Modal, Container } from 'react-bootstrap';
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useFormik} from 'formik'
import { registerSchema } from '../../Schemas/registerSchema'

function RegisterModal(props) {

   
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const errRef = useRef()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [register] = useRegisterMutation()
    
    
    useEffect(()=>{
            setShow(true)
    },[])

    const onSubmit = async (values, actions)=>{
        try{
            const { accessToken } = await register(values).unwrap()
            dispatch(setCredentials({ accessToken }))
            actions.resetForm()
            toast.success('Successful! Please Login')
        }catch(err){
            if (!err.status) {
                toast.error('No Server Response!')
            } else if(err.status === 409){
                toast.error('Username has been taken')
            }else if(err.status === 410){
              toast.error('Email has been taken')  
            }else {
                toast.error(err.data?.message);
            }
        }
        
    }
   
    const {values, isSubmitting, setSubmitting, handleBlur, errors, handleChange, touched, handleSubmit} = useFormik({
        initialValues:{
            email: "",
            username:"",
            password:"",
            confirmPassword:""
         },
        validationSchema: registerSchema,
        onSubmit
    })
    
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Register
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="">
        <Container>
        <main className="register">
            <form onSubmit={handleSubmit} autoComplete='off' className='form'>
                 <label htmlFor="email" className='form__label'>Email</label>
                <input type="email"
                    id='email'
                    placeholder='example@mail.com'
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.email ? 'input-error' : 'form__input'}
                    />
                    {errors.email && touched.email && <p className='input-feedback'>{errors.email}</p>}

                <label htmlFor="username">Username</label>
                <input type="text"
                        id='username'
                        required
                        placeholder='Username'
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.username ? 'input-error' : 'form__input'}
                        />
                        {errors.username && touched.username && <p className='input-feedback'>{errors.username}</p>}

                <label htmlFor="password">Password</label>
                <input type="password"
                        id='password'
                        required
                        placeholder='Password'
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.password ? 'input-error' : 'form__input'}
                        />
                        {errors.password && touched.password && <p className='input-feedback'>{errors.password}</p>}

                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password"
                        id='confirmPassword'
                        required
                        placeholder='Confirm Password'
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.confirmPassword ? 'input-error' : 'form__input'}
                        />
                        {errors.confirmPassword && touched.confirmPassword && <p className='input-feedback'>{errors.confirmPassword}</p>}
                        
                <div className='d-flex justify-content-center align-items-center'>
                        <button className="form__submit-button mb-3" disabled={isSubmitting}>
                            Register</button>
                    </div>    
                    <ToastContainer autoClose={5000} />
            </form>
        </main>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default RegisterModal