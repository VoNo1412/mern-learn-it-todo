import { createContext, useContext, useReducer, useEffect } from "react";
import { AuthReducer } from "../reducers/AuthReducer";
import { api, LOCAL_STORAGE_TOKEN } from "./constant";
import { setAuthToken } from '../utils/setAuthToken';

const initialState = {
    loading: true,
    user: '',
    isAuthenticated: false,
    error: ''
}

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(AuthReducer, initialState)

    // check authenticated
    useEffect(() => {
        console.log('Inside useEffect authContext');
        const authen = () => loadUser();
        authen();
    }, [])


    //Authenticated user
    const loadUser = async () => {
        if (localStorage[LOCAL_STORAGE_TOKEN]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN]);
        }

        try {
            const res = await api.get('/auth');
            if (res.data.status === 'success') {
                dispatch({
                    type: 'SET_AUTH',
                    payload: {
                        loading: false,
                        isAuthenticated: true,
                        user: res.data.user
                    }
                });
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN);
            setAuthToken(null);
            dispatch({
                type: 'SET_AUTH',
                payload: {
                    loading: false,
                    isAuthenticated: false,
                    user: null,
                    error
                }
            });

            throw new Error('This is error: ', error)
        }
    }

    const signupUser = async (accountSignUp) => {
        const { username, password } = await accountSignUp;

        const account = { username, password }

        try {
            const res = await api.post('/auth/register', account);
            return res.data;
        } catch (error) {
            dispatch({
                type: 'ACCOUNT_FAILURE', payload: { error }
            })
        }
    }

    const loginUser = async (accountLogin) => {
        try {
            const res = await api.post(`/auth/login`, accountLogin);
            const token = res.data.accessToken;
            if (token) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN, token)
            }

            await loadUser()
            return res.data;
        } catch (error) {
            dispatch({
                type: 'ACCOUNT_FAILURE', payload: { error }
            })
        }
    }

    const logout = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN)
        dispatch({
            type: 'SET_AUTH', payload: {
                loading: false,
                isAuthenticated: false,
                user: '',
                error: ''
            }
        })
    }

    const AuthDataContext = {
        authState,
        loginUser,
        loadUser,
        signupUser,
        logout
    }

    return <AuthContext.Provider value={AuthDataContext}>
        {children}
    </AuthContext.Provider>
}

export const useContextAuth = () => {
    return useContext(AuthContext);
}

export {
    AuthProvider
}