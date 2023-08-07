import {
  POST_CREATE_NEW_ACCOUNT,
  POST_NEW_ACCOUNT_SUCCESS,
  POST_NEW_ACCOUNT_FAILURE,
  POST_NEW_ACCOUNT_SERVER_FAIL,
  POST_LOGIN,
  POST_LOGIN_SUCCES,
  POST_LOGIN_FAILURE,
  POST_LOGIN_SERVER_FAIL,
  LOG_OUT,
  PUT_UPDATE_ACCOUNT,
  PUT_UPDATE_ACCOUNT_SUCCESS,
  PUT_UPDATE_ACCOUNT_FAILURE,
  PUT_UPDATE_ACCOUNT_SERVER_FAIL,
  GET_CURRENT_USER,
} from '../actions/actionTypes'

const initStateAccount = {
  user: {
    username: null,
    email: null,
    token: null,
    image: null,
  },
  server: {
    errors: {
      username: null,
      email: null,
    },
  },
  isLogin: false,
  loading: false,
  error: null,
}

const reducerUser = (state = initStateAccount, action) => {
  switch (action.type) {
    /* CREATE NEW ACCOUNT */
    case POST_CREATE_NEW_ACCOUNT:
      return { ...state, loading: true, error: null }
    case POST_NEW_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        server: {
          errors: {
            username: null,
            email: null,
          },
        },
        user: action.payload,
      }
    case POST_NEW_ACCOUNT_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case POST_NEW_ACCOUNT_SERVER_FAIL:
      return { ...state, loading: false, server: action.payload }
    /* LOGIN IN/LOG OUT */
    case POST_LOGIN:
      return { ...state, loading: true, error: null }
    case POST_LOGIN_SUCCES:
      return {
        ...state,
        isLogin: true,
        loading: false,
        error: null,
        server: {
          errors: {
            username: null,
            email: null,
          },
        },
        user: action.payload,
      }
    case POST_LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case POST_LOGIN_SERVER_FAIL:
      return {
        ...state,
        loading: false,
        error: null,
        server: { errors: { ...action.payload } },
      }
    case LOG_OUT:
      return {
        user: {
          username: null,
          email: null,
          token: localStorage.removeItem('token'),
          image: null,
        },
        server: {
          errors: {
            username: null,
            email: null,
          },
        },
        isLogin: false,
        loading: false,
        error: null,
      }
    /* UPDATE USER */
    case PUT_UPDATE_ACCOUNT:
      return { ...state, loading: true, error: null }
    case PUT_UPDATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload,
        server: {
          errors: {
            username: null,
            email: null,
          },
        },
      }
    case PUT_UPDATE_ACCOUNT_FAILURE:
      return { ...state, loading: false, error: action.payload }

    case PUT_UPDATE_ACCOUNT_SERVER_FAIL:
      return { ...state, loading: false, server: action.payload }
    /* GET CURRENT USER */
    case GET_CURRENT_USER:
      return { ...state, isLogin: true, user: action.payload }
    default:
      return state
  }
}

export default reducerUser
