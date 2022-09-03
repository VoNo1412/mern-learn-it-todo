import React from 'react'
import { usePostContext } from '../../context/PostConext';
import { useContextAuth } from '../../context/AuthContext';
import AddPost from '../posts/AddPost';
import AlertMessage from '../layout/AlertMessage';
import UpdatePost from '../posts/UpdatePost';
import OverlayAdd from '../../utils/OverlayAdd';
import SpinnerCus from '../feature/Spinner';
import CardCus from '../posts/CardCus';
import ListPost from '../posts/ListPost';

const DashBoard = () => {
  const { authState } = useContextAuth();
  const { postState, alert } = usePostContext();
  const { loading, posts } = postState;

  let main = loading ? <SpinnerCus /> :
    posts.length === 0 ?
      <CardCus username={authState.user.username} /> :
      <ListPost posts={posts} />

  return (<>
    <AlertMessage info={alert} className='my-10 text-center' />
    <AddPost />
    <UpdatePost />
    <OverlayAdd />
    {main}
  </>)
}

export default DashBoard

