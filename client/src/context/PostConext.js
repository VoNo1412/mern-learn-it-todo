import { createContext, useReducer, useContext, useEffect, useCallback, useState } from "react";
import useAlert from "../components/Hooks/useAlert";
import useForm from "../components/Hooks/useForm";
import postReducer from "../reducers/PostReducer";
import { api } from './constant';

const PostContext = createContext({});
const initalState = {
    loading: true,
    posts: [],
    error: ''
}

const PostProvider = ({ children }) => {
    const [postState, dispatch] = useReducer(postReducer, initalState);
    const [values, onChangeHandle, setValues] = useForm();
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [alert, setAlert] = useAlert();

    const getPosts = useCallback(async () => {
        const res = await api.get("/posts");

        try {
            if (res.status === 200) {
                dispatch({
                    type: 'GET_ALL_POSTS',
                    payload: {
                        loading: false,
                        posts: res.data.posts
                    }
                })
            }
        } catch (error) {
            dispatch({
                type: 'GET_POSTS_FAILURE',
                payload: { error }
            })
        }
    }, []);

    useEffect(() => {
        getPosts();
    }, [getPosts])


    // Insert Post
    const insertPost = async (newPost) => {
        try {
            const res = await api.post('/posts/post', newPost);

            if (res.status === 200) {
                dispatch({ type: 'INSERT_POST', payload: { post: res.data.post } });

                return res.data;
            }
        } catch (error) {
            console.log(error.res.data.error);
        }
    }

    // del post
    const delPost = async (id) => {
        try {
            const res = await api.delete(`/posts/post/${id}`);
            if (res.status === 200) {
                dispatch({ type: 'DELETE_POSTS', payload: { id } })
                return res.data;
            }
        } catch (error) {
            console.log(error.res.data.error);
        }
    }

    // update
    const updatePost = async (post) => {
        try {
            try {
                const res = await api.put(`/posts/post/${post._id}`, post);
                console.log(res)

                if (res.status === 200) {
                    dispatch({
                        type: 'UPDATE_POST',
                        payload: {
                            post: res.data.post
                        }
                    });

                    return res.data;
                }
            } catch (error) {
                console.log(error.res.data.error);
            }
        } catch (error) {
            console.log(error.res.data.error);
        }
    }

    // getpostbyID
    const getPostByID = async (id) => {
        setShowEdit(!showEdit);
        const post = postState.posts.filter(post => (post._id === id))[0];
        setValues({ ...post });
    }

    const PostDataContext = {
        postState,
        getPosts,
        insertPost,
        delPost,
        updatePost,
        values,
        setValues,
        onChangeHandle,
        show,
        setShow,
        showEdit,
        setShowEdit,
        getPostByID,
        alert,
        setAlert
    }
    return <PostContext.Provider value={PostDataContext}>
        {children}
    </PostContext.Provider>
}

export default PostProvider;

export const usePostContext = () => {
    return useContext(PostContext);
}