import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from '../features/auth/authSlice'
import { useLoginMutation } from '../features/auth/authApiSlice'

import usePersist from '../hooks/usePersist';


import { Button, Modal, Container } from 'react-bootstrap';


function LoginModal(props) {

    // const handleClose = () => setShow(false);

    const userRef = useRef()  
    const errRef = useRef()
    const [errMsg, setErrMsg] = useState('')
    const [show, setShow] = useState(false);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [persist, setPersist] = usePersist()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    // useEffect(() => {
    //     userRef.current.focus()
    // }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])

    useEffect(()=>{
            setShow(true)
    },[])


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { accessToken } = await login({ username, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            setUsername('')
            setPassword('')
            navigate('/naijacities/u')
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.data?.message);
            }
            errRef.current.focus();
        }
    }

    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)
    const handleToggle = () => setPersist(prev => !prev)

    const errClass = errMsg ? "errmsg" : "offscreen"

    if (isLoading) return <p>Loading...</p>
  return (
    <Modal {...props} show={show} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Login
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="">
        <Container>
        <main className="login">
                <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>

                <form className="form " onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input
                        className="form__input "
                        type="text"
                        id="username"
                        ref={userRef}
                        value={username}
                        onChange={handleUserInput}
                        autoComplete="off"
                        autoFocus
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        className="form__input mb-3"
                        type="password"
                        id="password"
                        onChange={handlePwdInput}
                        value={password}
                        required
                    />
                    <div className='d-flex justify-content-center align-items-center'>
                        <button className="form__submit-button mb-3">Sign In</button>
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