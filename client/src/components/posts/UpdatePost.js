import Button from 'react-bootstrap/Button';
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { usePostContext } from '../../context/PostConext';
const UpdatePost = () => {
    const {
        showEdit,
        setShowEdit,
        values,
        setValues,
        onChangeHandle,
        updatePost,
        setAlert,
    } = usePostContext();

    const handleModelEdit = () => {
        setValues('');
        setShowEdit(!showEdit);
    }

    const handleUpdate = async e => {
        e.preventDefault();
        try {
            const res = await updatePost(values);
            if (res.status === 'failure') {
                setAlert({ type: "danger", message: res.msg });
            } else {
                setAlert({ type: "success", message: 'Update success!' });
            }

            handleModelEdit();
        } catch (error) {
            setAlert({ type: "danger", message: error.res.data.error});
        }

        setShowEdit(!showEdit);
    }

    return (
        <Modal show={showEdit} onHide={handleModelEdit}>
            <Modal.Header closeButton>
                <Modal.Title>Update TO LEARN</Modal.Title>
            </Modal.Header>
            <Form onSubmit={e => e.preventDefault()}>
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
                            value={values.status}
                            required
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
                    <Button variant='danger' onClick={handleModelEdit}>Cancel</Button>

                    <Button type='button' variant='info' onClick={handleUpdate}>Submit</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default UpdatePost