import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom'
import ButtonCus from '../feature/Button';
import { useContextAuth } from '../../context/AuthContext';
import AlertMessage from '../layout/AlertMessage';
import useForm from '../Hooks/useForm';
import useAlert from '../Hooks/useAlert';

const Register = () => {
  const navigate = useNavigate();
  const { signupUser } = useContextAuth();
  const [values, onChangeHandle] = useForm();
  const [alert, setAlert] = useAlert();

  const handleFormRegister = async e => {
    e.preventDefault();
    if(values.password !== values.confirm_password) {
      setAlert({ type: "danger", message: 'Please check confirm not match!' });
    }

    try {
      const register = await signupUser(values);
     
      if (register.status === 'failure') {
        setAlert({ type: "danger", message: register.msg});
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Form onSubmit={handleFormRegister}>
        <AlertMessage info={alert} />
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control type="text" placeholder="Enter username" required name="username" value={values.username || ''} onChange={onChangeHandle} />
          <Form.Text className="text-light">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control type="password" placeholder="Password" required name="password" value={values.password || ''} onChange={onChangeHandle} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword2">
          <Form.Control type="password" placeholder="Confirm Password" required name="confirm_password" value={values.confirm_password || ''} onChange={onChangeHandle} />
        </Form.Group>

        <ButtonCus name="register" />
      </Form>
      <div className='d-flex'>
        <p>Already have an account ?</p>
        <Link to={'/login'}>
          <ButtonCus name="login" />
        </Link>
      </div>
    </>
  )
}

export default Register