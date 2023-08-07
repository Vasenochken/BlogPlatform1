import getArticlesAll from '../../service/getArticlesAll'
import getArticle from '../../service/getArticle'
import postRegisterUser from '../../service/postRegisterUser'
import postLoginUser from '../../service/postLoginUser'
import updateUser from '../../service/putUpDateUser'
import getCurrentUser from '../../service/getCurrentUser'
import postCreateArticle from '../../service/postCreateArticle'
import postFavoriteArticle from '../../service/postFavoriteArticle'
import deleteArticle from '../../service/deleteArticle'
import putUpDateArticle from '../../service/putUpDateArticle'
import unfavoriteArticle from '../../service/deleteFavoriteArticle'
import {
  FETCH_ARTICLES_FAILURE,
  FETCH_ARTICLES_REQUEST,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLE_SLUG_REQUEST,
  FETCH_ARTICLE_SLUG_SUCCESS,
  FETCH_ARTICLE_SLUG_FAILURE,
  FETCH_ARTICLE_SLUG_EDIT_REQUEST,
  FETCH_ARTICLE_SLUG_EDIT_SUCCESS,
  FETCH_ARTICLE_SLUG_EDIT_FAILURE,
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
  POST_ARTICLE,
  POST_ARTICLE_SUCCESS,
  POST_ARTICLE_FAILURE,
  POST_ARTICLE_SERVER_FAIL,
  DELETE_ARTICLE,
  DELETE_ARTICLE_SUCCESS,
  DELETE_ARTICLE_FAILURE,
  DELETE_ARTICLE_SERVER_FAIL,
  PUT_EDIT_ARTICLE,
  PUT_EDIT_ARTICLE_SUCCES,
  PUT_EDIT_ARTICLE_FAILURE,
  PUT_EDIT_ARTICLE_SERVER_FAIL,
  POST_FAVORITE_ARTICLE,
  DELETE_FAVORITE_ARTICLE,
} from './actionTypes'
import instanceAxios from '../../service/instanceAxios'

/* GET ALL ARTICLES */

export const fetchArticlesRequest = () => ({
  type: FETCH_ARTICLES_REQUEST,
})
export const fetchArticlesSuccess = (articles, articlesCount) => ({
  type: FETCH_ARTICLES_SUCCESS,
  payload: { articles, articlesCount },
})
export const fetchArticlesFailure = (error) => ({
  type: FETCH_ARTICLES_FAILURE,
  payload: error,
})

export const fetchData = (page) => {
  return async (dispatch) => {
    try {
      dispatch(fetchArticlesRequest())
      const res = await getArticlesAll(page)
      const { articles, articlesCount } = res.data
      dispatch(fetchArticlesSuccess(articles, articlesCount))
    } catch (error) {
      dispatch(fetchArticlesFailure(error.message))
    }
  }
}

/* GET AN ARTICLE SLUG */

export const fetchArticleSlugRequest = () => ({
  type: FETCH_ARTICLE_SLUG_REQUEST,
})
export const fetchArticleSlugSuccess = (article) => ({
  type: FETCH_ARTICLE_SLUG_SUCCESS,
  payload: article,
})
export const fetchArticleSlugFail = (error) => ({
  type: FETCH_ARTICLE_SLUG_FAILURE,
  payload: error,
})

export const getAnArticle = (slug) => {
  return async (dispatch) => {
    try {
      dispatch(fetchArticleSlugRequest())
      const res = await getArticle(slug)
      const { article } = res.data
      dispatch(fetchArticleSlugSuccess(article))
    } catch (error) {
      dispatch(fetchArticleSlugFail(error.message))
    }
  }
}

/* GET AN ARTICLE SLUG EDIT*/

export const fetchArticleSlugEditRequest = () => ({
  type: FETCH_ARTICLE_SLUG_EDIT_REQUEST,
})
export const fetchArticleSlugEditSuccess = (article) => ({
  type: FETCH_ARTICLE_SLUG_EDIT_SUCCESS,
  payload: article,
})
export const fetchArticleSlugEditFail = (error) => ({
  type: FETCH_ARTICLE_SLUG_EDIT_FAILURE,
  payload: error,
})

export const getAnArticleEdit = (slug) => {
  return async (dispatch) => {
    try {
      dispatch(fetchArticleSlugEditRequest())
      const res = await getArticle(slug)
      const { article } = res.data
      dispatch(fetchArticleSlugEditSuccess(article))
    } catch (error) {
      dispatch(fetchArticleSlugEditFail(error.message))
    }
  }
}

/* CREATE NEW ACCOUNT */

export const postCreateNewAcc = () => ({ type: POST_CREATE_NEW_ACCOUNT })
export const postCreateNewAccSuccess = (user) => ({
  type: POST_NEW_ACCOUNT_SUCCESS,
  payload: user,
})
export const postCreateNewAccFail = (error) => ({
  type: POST_NEW_ACCOUNT_FAILURE,
  payload: error,
})
export const postCreateNewAccServerFail = (error) => ({
  type: POST_NEW_ACCOUNT_SERVER_FAIL,
  payload: error,
})

export const registerUser = (dataUser) => {
  return async (dispatch) => {
    try {
      dispatch(postCreateNewAcc())
      const res = await postRegisterUser(dataUser)
      const { user } = res.data
      dispatch(postCreateNewAccSuccess(user))
    } catch (error) {
      if (error.response.status === 422)
        dispatch(postCreateNewAccServerFail(error.response.data))
      else dispatch(postCreateNewAccFail(error.message))
    }
  }
}

/* LOGIN IN */

export const postLogin = () => ({ type: POST_LOGIN })
export const postLoginSuccess = (user) => ({
  type: POST_LOGIN_SUCCES,
  payload: user,
})
export const postLoginFail = (error) => ({
  type: POST_LOGIN_FAILURE,
  payload: error,
})

export const postLoginServerFail = (error) => ({
  type: POST_LOGIN_SERVER_FAIL,
  payload: error,
})

export const loginUser = (dataUser) => {
  return async (dispatch) => {
    try {
      dispatch(postLogin())
      const res = await postLoginUser(dataUser)
      console.log(res)
      const { user } = res.data
      const { token } = user
      if (token !== localStorage.getItem('token')) {
        localStorage.setItem('token', token)
        instanceAxios.defaults.headers.Authorization = `Token ${token}`
      }
      dispatch(postLoginSuccess(user))
    } catch (error) {
      if (error.message === '422') dispatch(postLoginServerFail(error))
      else dispatch(postLoginFail(error.message))
    }
  }
}

/* UPDATE USER */

export const putUpDateUser = () => ({ type: PUT_UPDATE_ACCOUNT })
export const putUpDateUserSuccess = (user) => ({
  type: PUT_UPDATE_ACCOUNT_SUCCESS,
  payload: user,
})
export const putUpDateUserFail = (error) => ({
  type: PUT_UPDATE_ACCOUNT_FAILURE,
  payload: error,
})

export const putUpDateUserServerFail = (error) => ({
  type: PUT_UPDATE_ACCOUNT_SERVER_FAIL,
  payload: error,
})

export const userUpdate = (dataUser) => {
  return async (dispatch) => {
    try {
      dispatch(putUpDateUser())
      const res = await updateUser(dataUser)
      const { user } = res.data
      dispatch(putUpDateUserSuccess(user))
    } catch (error) {
      if (error.message === '422') dispatch(putUpDateUserServerFail(error))
      else dispatch(putUpDateUserFail(error.message))
    }
  }
}

/* LOG OUT */

export const logOut = () => ({ type: LOG_OUT })

/* GET CURRENT USER */

export const currentUser = (user) => ({ type: GET_CURRENT_USER, payload: user })

export const curUser = () => {
  return async (dispatch) => {
    try {
      const res = await getCurrentUser()
      const { user } = res.data
      dispatch(currentUser(user))
    } catch (error) {
      console.log(error)
    }
  }
}

/* CREATE NEW ARTICLE */

export const postArticle = () => ({ type: POST_ARTICLE })

export const postArticleSuccess = (article) => ({
  type: POST_ARTICLE_SUCCESS,
  payload: article,
})

export const postArticleFail = (error) => ({
  type: POST_ARTICLE_FAILURE,
  payload: error,
})

export const postArticleServerFail = (error) => ({
  type: POST_ARTICLE_SERVER_FAIL,
  payload: error,
})

export const createArticle = (dataArticle) => {
  return async (dispatch) => {
    try {
      dispatch(postArticle())
      const res = await postCreateArticle(dataArticle)
      const { article } = res.data
      dispatch(postArticleSuccess(article))
    } catch (error) {
      if (error.message === '422') dispatch(postArticleServerFail(error))
      else dispatch(postArticleFail(error.message))
    }
  }
}

/* PUT UPDATE ARTICLE */

export const putEditArticle = () => ({ type: PUT_EDIT_ARTICLE })

export const putEditArticleSuccess = () => ({
  type: PUT_EDIT_ARTICLE_SUCCES,
})

export const putEditArticleFail = (error) => ({
  type: PUT_EDIT_ARTICLE_FAILURE,
  payload: error,
})

export const putEditArticleServerFail = (error) => ({
  type: PUT_EDIT_ARTICLE_SERVER_FAIL,
  payload: error,
})

export const upDateArticle = (dataArticle, slug) => {
  return async (dispatch) => {
    try {
      dispatch(putEditArticle())
      const response = await putUpDateArticle(dataArticle, slug)
      console.log('ResponceUpDateArticle: ', response)
      dispatch(putEditArticleSuccess())
    } catch (error) {
      if (error.message === '422') dispatch(putEditArticleServerFail(error))
      else dispatch(putEditArticleFail(error.message))
    }
  }
}

/* DELETE ARTICLE */

export const fetchDeleteArticle = () => ({ type: DELETE_ARTICLE })

export const fetchDeleteArticleSuccess = () => ({
  type: DELETE_ARTICLE_SUCCESS,
})

export const fetchDeleteArticleFail = (error) => ({
  type: DELETE_ARTICLE_FAILURE,
  payload: error,
})
export const fetchDeleteArticleServerFail = (error) => ({
  type: DELETE_ARTICLE_SERVER_FAIL,
  payload: error,
})
export const delArticle = (slug) => {
  return async (dispatch) => {
    try {
      dispatch(fetchDeleteArticle())
      const res = await deleteArticle(slug)
      if (res.status === 204) dispatch(fetchDeleteArticleSuccess())
    } catch (error) {
      if (error.message === '422') dispatch(fetchDeleteArticleServerFail(error))
      else dispatch(fetchDeleteArticleFail(error.message))
    }
  }
}

/* FAVORITE ARTICLE */
export const postFavoriteArticle1 = (article) => ({
  type: POST_FAVORITE_ARTICLE,
  payload: article,
})

export const delFavoriteArticle1 = (article) => ({
  type: DELETE_FAVORITE_ARTICLE,
  payload: article,
})

export const likeArticle = (slug) => {
  return async (dispatch) => {
    try {
      const res = await postFavoriteArticle(slug)
      const { article } = res.data
      dispatch(postFavoriteArticle1(article))
    } catch (error) {
      console.error(error)
    }
  }
}

export const unlikeArticle = (slug) => {
  return async (dispatch) => {
    try {
      const res = await unfavoriteArticle(slug)
      const { article } = res.data
      dispatch(delFavoriteArticle1(article))
    } catch (error) {
      if (error.message === '422') console.log('422', error)
      else console.log('Another er', error)
    }
  }
}
