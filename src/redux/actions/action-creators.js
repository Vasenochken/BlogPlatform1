import getArticle from '../../service/getArticle'
import postRegisterUser from '../../service/postRegisterUser'
import postLoginUser from '../../service/postLoginUser'
import updateUser from '../../service/putUpDateUser'
import postCreateArticle from '../../service/postCreateArticle'
import postFavoriteArticle from '../../service/postFavoriteArticle'
import { getArticlesAll, getCurrentUser } from '../../service/service'
import {
  FETCH_ARTICLES_FAILURE,
  FETCH_ARTICLES_REQUEST,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLE_SLUG_REQUEST,
  FETCH_ARTICLE_SLUG_SUCCESS,
  FETCH_ARTICLE_SLUG_FAILURE,
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
} from './action-types'
import deleteArticle from '../../service/deleteArticle'
import putUpDateArticle from '../../service/putUpDateArticle'
import unfavoriteArticle from '../../service/deleteFavoriteArticle'

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
      const response = await getArticlesAll(page)
      const { articles, articlesCount } = response
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
      const response = await getArticle(slug)
      const { article } = response
      console.log('RESPONCE ARTICLE', article)
      dispatch(fetchArticleSlugSuccess(article))
    } catch (error) {
      dispatch(fetchArticleSlugFail(error.message))
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
    // console.log('DATAUSER: ', dataUser)
    try {
      dispatch(postCreateNewAcc())
      const response = await postRegisterUser(dataUser)
      // console.log('RESPONSE c JSON()', response)
      const { user } = response
      dispatch(postCreateNewAccSuccess(user))
    } catch (error) {
      // console.log('V catch: ', error)
      // console.log(error.message)
      if (error.message === '422') dispatch(postCreateNewAccServerFail(error))
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
    // console.log('DATAUSER: ', dataUser)
    try {
      dispatch(postLogin())
      const res = await postLoginUser(dataUser)
      console.log('resLOGINUSER: ', res)
      const { user } = res
      dispatch(postLoginSuccess(user))
    } catch (error) {
      // console.log('ERROR in userLogin block error', error)
      if (error.message === '422') dispatch(postLoginServerFail(error))
      else dispatch(postLoginFail(error.message))
      // console.log(error)
    }
  }
}

export const logOut = () => ({ type: LOG_OUT })

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

export const userUpdate = (dataUser, token) => {
  return async (dispatch) => {
    // console.log('DATAUSER: ', dataUser)
    try {
      dispatch(putUpDateUser()) // suda req
      const response = await updateUser(dataUser, token)
      // console.log('ResponceUPDATEUser: ', response)
      const { user } = response
      dispatch(putUpDateUserSuccess(user))
    } catch (error) {
      // console.log('ERROR in userLogin block error', error)
      if (error.message === '422') dispatch(putUpDateUserServerFail(error))
      else dispatch(putUpDateUserFail(error.message))
      // console.log(error)
    }
  }
}

/* GET CURRENT USER */

export const currentUser = (user) => ({ type: GET_CURRENT_USER, payload: user })

export const curUser = (token) => {
  return async (dispatch) => {
    try {
      const response = await getCurrentUser(token)
      // console.log('RESPONCE: ', response)
      const { user } = response
      // console.log('USER', user)
      dispatch(currentUser(user))
    } catch (e) {
      console.log(e)
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
    // console.log('DATAUSER: ', dataUser)
    try {
      dispatch(postArticle()) // suda req
      const response = await postCreateArticle(dataArticle)
      // console.log('ResponceLoginUser: ', response)
      const { article } = response
      dispatch(postArticleSuccess(article))
    } catch (error) {
      // console.log('ERROR in userLogin block error', error)
      if (error.message === '422') dispatch(postArticleServerFail(error))
      else dispatch(postArticleFail(error.message))
      // console.log(error)
    }
  }
}

/* PUT UPDATE ARTICLE */

export const putEditArticle = () => ({ type: PUT_EDIT_ARTICLE })

export const putEditArticleSuccess = (/*article*/) => ({
  type: PUT_EDIT_ARTICLE_SUCCES,
  // payload: article,
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
    // console.log('DATAUSER: ', dataUser)
    try {
      dispatch(putEditArticle()) // suda req
      const response = await putUpDateArticle(dataArticle, slug)
      console.log('ResponceLoginUser: ', response)
      // const { article } = response
      if (response.ok) dispatch(putEditArticleSuccess())
    } catch (error) {
      // console.log('ERROR in userLogin block error', error)
      if (error.message === '422') dispatch(putEditArticleServerFail(error))
      else dispatch(putEditArticleFail(error.message))
      // console.log(error)
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
    // console.log('DATAUSER: ', dataUser)
    try {
      dispatch(fetchDeleteArticle())
      const response = await deleteArticle(slug)
      // console.log('resDELETEFAVORITE: ', response)
      console.log('RESPONCE DELETE ARTICLE', response)
      dispatch(fetchDeleteArticleSuccess())
      // console.log('hey ypu', response)
      // console.log('ResponceLoginUser: ', response)
      // dispatch(fetchDeleteArticleSuccess())
    } catch (error) {
      console.log('ERROR in userLogin block error', error)
      if (error.message === '422') dispatch(fetchDeleteArticleServerFail(error))
      else dispatch(fetchDeleteArticleFail(error.message))
      console.log(error)
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
    // console.log('DATAUSER: ', dataUser)
    try {
      // dispatch(postFavoriteArticle())
      const response = await postFavoriteArticle(slug)
      const { article } = response
      console.log('PosleFavorited: ', article)
      dispatch(postFavoriteArticle1(article))
      // console.log('hey ypu', response)
      // console.log('ResponceLoginUser: ', response)
      // dispatch(fetchDeleteArticleSuccess())
    } catch (error) {
      console.log('ERROR in userLogin block error', error)
      if (error.message === '422') console.log('422', error)
      // dispatch(fetchDeleteArticleServerFail(error))
      else console.log('Another er', error)
      console.log(error)
    }
  }
}

export const unlikeArticle = (slug) => {
  return async (dispatch) => {
    // console.log('DATAUSER: ', dataUser)
    try {
      // dispatch(postFavoriteArticle())
      const response = await unfavoriteArticle(slug)
      console.log('PosleFavorited: ', response)
      const { article } = response
      dispatch(delFavoriteArticle1(article))
      // console.log('hey ypu', response)
      // console.log('ResponceLoginUser: ', response)
      // dispatch(fetchDeleteArticleSuccess())
    } catch (error) {
      console.log('ERROR in userLogin block error', error)
      if (error.message === '422') console.log('422', error)
      // dispatch(fetchDeleteArticleServerFail(error))
      else console.log('Another er', error)
      console.log(error)
      // if (error.message === '422') dispatch(fetchDeleteArticleServerFail(error))
      // else dispatch(fetchDeleteArticleFail(error.message))
      // console.log(error)
    }
  }
}
