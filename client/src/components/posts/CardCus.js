import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const CardCus = ({username}) => {
    return (
        <Card className='text-center mx-5 my-5'>
            <Card.Header>Hi {username}</Card.Header>
            <Card.Body>
                <Card.Title>Welcome to learn it</Card.Title>
                <Card.Text>Click the button below to track your first skill to learn</Card.Text>
                <Button variant='primary'>ADD TODO</Button>
            </Card.Body>
        </Card>
    )
}

export default CardCus