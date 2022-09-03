export const AuthReducer = (state, action) => {
    switch(action.type) {
        case 'SET_AUTH':
            return {
                ...state,
                loading: action.payload.loading,
                isAuthenticated: action.payload.isAuthenticated,
                user: action.payload.user,
            }

        case 'ACCOUNT_FAILURE':
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: '',
                error: action.payload.error
            }

        default:
            return state;
    }
}