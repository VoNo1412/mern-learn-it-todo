import Button from 'react-bootstrap/Button';
import playIcon from '../../assets/play-btn.svg';
import editIcon from '../../assets/pencil.svg';
import deleteIcon from '../../assets/trash.svg';
import { usePostContext } from '../../context/PostConext';

const ActionButton = ({ url, _id }) => {
    const { getPostByID, delPost, setAlert } = usePostContext();

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



    return (
        <>
            <Button className='post-button' href={url + `/${_id}`} target="_blank">
                <img src={playIcon} alt="play-icon" width='24' height='24' />
            </Button>
            <Button className='post-button' onClick={() => getPostByID(_id)}>
                <img src={editIcon} alt="edit-icon" width='24' height='24' />
            </Button>
            <Button className='post-button' onClick={() => handleDel(_id)}>
                <img src={deleteIcon} alt="del-icon" width='24' height='24' />
            </Button>
        </>
    )
}

export default ActionButton
