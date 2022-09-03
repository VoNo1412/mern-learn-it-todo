import React from 'react'
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom'
import { useContextAuth } from '../../context/AuthContext';
import { usePostContext } from '../../context/PostConext';
import ButtonCus from '../feature/Button';
import AlertMessage from '../layout/AlertMessage';


const SignIn = () => {
    const { loginUser } = useContextAuth();
    const {values, onChangeHandle, alert, setAlert} = usePostContext();
    const navigate = useNavigate();

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        try {
            const loginData = await loginUser(values);
            if (loginData.status === 'success') {
                navigate('/dashboard');
                console.log('login success!')
            } else {
                setAlert({ type: "danger", message: loginData.msg });

            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Form onSubmit={handleSubmitLogin}>
                <AlertMessage info={alert} />
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="Enter username"
                        name="username"
                        value={values.username || ''}
                        onChange={onChangeHandle}
                        required
                    />
                    <Form.Text className="text-light">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Enter Password"
                        name="password"
                        value={values.password || ''}
                        onChange={onChangeHandle}
                        required
                    />
                </Form.Group>

                <ButtonCus name="login" />
            </Form>
            <div className='d-flex'>
                <p>Don't have an account?</p>
                <Link to={'/register'}>
                    <ButtonCus name="register" />
                </Link>
            </div>
        </>
    )
}

export default SignIn