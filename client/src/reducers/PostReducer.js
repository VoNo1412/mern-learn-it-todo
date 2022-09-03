const postReducer = (state, action) => {
    switch (action.type) {
        case 'GET_ALL_POSTS':
            return {
                ...state,
                loading: false,
                posts: action.payload.posts
            }
        case 'GET_POSTS_FAILURE':
            return {
                ...state,
                error: action.payload.error
            }

        case 'INSERT_POST':
            return {
                ...state,
                loading: false,
                posts: [
                    ...state.posts,
                    action.payload.post
                ]
            }

        case 'UPDATE_POST':
            return {
                ...state,
                loading: false,
                posts: state.posts.map(post => (post._id === action.payload.post._id) ? {...action.payload.post} : post)
            }

        case 'DELETE_POSTS':
            return {
                ...state,
                loading: false,
                posts: state.posts.filter(post => post._id !== action.payload.id)
            }

        default:
            return state;
    }
}

export default postReducer