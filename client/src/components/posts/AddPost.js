import Button from 'react-bootstrap/Button';
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { usePostContext } from '../../context/PostConext';
const AddPost = () => {
    const {
        show,
        setShow,
        setAlert,
        values,
        setValues,
        onChangeHandle,
        insertPost
    } = usePostContext();

   const handleModelAdd = () => {
        setValues('');
        setShow(!show);
    }

    const handleAddPost = async e => {
        e.preventDefault();

        try {
            const res = await insertPost(values);
            if (res.status === 'failure') {
                setAlert({ type: "danger", message: res.msg });
            } else {
                setAlert({ type: "success", message: res.msg });
            }

            handleModelAdd();
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Modal show={show} onHide={handleModelAdd}>
            <Modal.Header closeButton>
                <Modal.Title>What are you learn today?</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleAddPost}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control className='mt-3' type='text' placeholder='Title' name="title" required autoFocus
                            value={values.title || ''}
                            onChange={onChangeHandle}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control className='mt-3' as='textarea' placeholder='Desc' name="desc" required
                            onChange={onChangeHandle}
                            value={values.desc || ''}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Select 
                            className='mt-3'
                            as='select'
                            name="status"
                            required
                            value={values.status}
                            onChange={onChangeHandle}
                        >
                            <option value="TO LEARN">TO LEARN</option>
                            <option value="LEARNING">LEARNING</option>
                            <option value="LEARNED">LEARNED</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control className='mt-3' type='text' placeholder='URL' name="url"
                            onChange={onChangeHandle}
                            value={values.url || ''}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={handleModelAdd}>Cancel</Button>
                    <Button type='submit' variant='info' >Learn It</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddPost
