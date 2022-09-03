import React from 'react'
import addIcon from '../assets/plus-circle-fill.svg';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import { usePostContext } from '../context/PostConext';

const OverlayAdd = () => {
    const {
        show,
        setShow,
        setValues
    } = usePostContext();

    const handleModelAdd = () => {
        setValues('');
        setShow(!show);
    }
    return (
        <OverlayTrigger
            placement='left'
            overlay={<Tooltip>Add todo</Tooltip>}>
            <Button
                className='btn-floating'
                onClick={handleModelAdd}>
                <img src={addIcon} alt="add-icon.svg"
                    width={40} height={40} />
            </Button>
        </OverlayTrigger>
    )

}

export default OverlayAdd