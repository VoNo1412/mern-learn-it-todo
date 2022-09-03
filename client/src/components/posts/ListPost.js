import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';
import Post from '../posts/Post';

const ListPost = ({posts}) => {
  return (
    <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
      {
        posts.map(post =>
          <Col key={post._id} className='my-2'>
            <Post post={post} />
          </Col>)
      }
    </Row>
  )
}

export default ListPost