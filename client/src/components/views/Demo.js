import React, { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner';
import { usePostContext } from '../../context/PostConext';
import { useContextAuth } from '../../context/AuthContext';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';
import Post from '../posts/Post';
import Card from 'react-bootstrap/Card';
import AddPost from '../posts/AddPost';
import useForm from '../Hooks/useForm';
import useAlert from '../Hooks/useAlert';
import AlertMessage from '../layout/AlertMessage';
import addIcon from '../../assets/plus-circle-fill.svg';

const DashBoard = () => {
  const { authState: { user: { username } } } = useContextAuth();
  const { insertPost, delPost } = usePostContext();
  const { postState, getPosts } = usePostContext();
  const [values, handleForm, setState] = useForm();
  const [alert, setAlert] = useAlert();
  const [show, setShow] = useState(false);


  console.log('re-render dashboard')

  
  const handleModel = () => {
    setState('');
    setShow(!show);
  }

  const Insert = async e => {
    e.preventDefault();

    try {
      const res = await insertPost(values);

      if (res.status === 'failure') {
        setAlert({ type: "danger", message: res.msg });
      } else {
        setAlert({ type: "success", message: res.msg });
        setState('');
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDel = async (id) => {
    try {
      const res = await delPost(id);
      if (res.status === 'success') {
        setAlert({ type: "success", message: "Deleted successfully!" });
      }
    } catch (error) {
      console.log(error)
    }
  }

  let main = postState.loading ? <>
    <div className="spinner-container">
      <Spinner animation='border' variant='info' />
    </div>
  </> : postState.posts.length === 0 ? <>
    <Card className='text-center mx-5 my-5'>
      <Card.Header>Hi {username}</Card.Header>
      <Card.Body>
        <Card.Title>Welcome to learn it</Card.Title>
        <Card.Text>Click the button below to track your first skill to learn</Card.Text>
        <Button variant='primary'>ADD TODO</Button>
      </Card.Body>
    </Card>
  </> : <>
    <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
      {postState.posts.map(post => <Col key={post._id} className='my-2'>
        <Post post={post} handleDel={handleDel}/>
      </Col>
      )}
    </Row>
  </>


  return <>
    <AlertMessage info={alert} className='my-10 text-center'/>
    {main}
    <AddPost
      show={show}
      values={values}
      onChangeHandle={handleForm}
      handleModel={handleModel}
      handleForm={Insert}
    />


    <Button
     className='btn-floating'
     onClick={handleModel}>
      <img src={addIcon} alt="add-icon.svg"
       width={40} height={40} />
    </Button>
  </>
}

export default DashBoard
