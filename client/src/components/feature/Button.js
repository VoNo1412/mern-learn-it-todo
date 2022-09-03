import React from 'react'
import Button from 'react-bootstrap/Button';

const ButtonCus = (props) => {
  return (
    <Button
      variant='success'
      size='sm'
      className='ms-3 fw-bold text-light text-capitalize'
      type={'submit'}
    >
      {props.name}
    </Button>
  )
}

export default ButtonCus