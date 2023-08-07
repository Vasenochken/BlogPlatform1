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
  POST_ARTICLE,
  POST_ARTICLE_FAILURE,
  POST_ARTICLE_SERVER_FAIL,
  POST_ARTICLE_SUCCESS,
  DELETE_ARTICLE,
  DELETE_ARTICLE_SUCCESS,
  DELETE_ARTICLE_FAILURE,
  DELETE_ARTICLE_SERVER_FAIL,
  POST_FAVORITE_ARTICLE,
  DELETE_FAVORITE_ARTICLE,
  PUT_EDIT_ARTICLE,
  PUT_EDIT_ARTICLE_FAILURE,
  PUT_EDIT_ARTICLE_SUCCES,
  PUT_EDIT_ARTICLE_SERVER_FAIL,
} from '../actions/actionTypes'

const initStateArticles = {
  article: {
    slug: null,
    author: { username: null, image: null },
    title: null,
    favoritesCount: null,
    tagList: [],
    description: null,
    createdAt: null,
    body: null,
  },
  articles: [],
  articlesCount: 0,
  error: null,
  server: {
    errors: null,
  },
  loading: false,
  statusDelete: false,
  statusEdit: false,
  statusCreate: false,
  flag: false,
}

const reducerArticles = (state = initStateArticles, action) => {
  switch (action.type) {
    /* ALL ARTICLES */
    case FETCH_ARTICLES_REQUEST:
      return { ...state, loading: true, error: null }
    case FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        loading: false,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        statusDelete: false,
        statusEdit: false,
        statusCreate: false,
      }
    case FETCH_ARTICLES_FAILURE:
      return { ...state, loading: false, error: action.payload }
    /* ARTICLE PAGE */
    case FETCH_ARTICLE_SLUG_REQUEST:
      return { ...state, loading: true, error: null }
    case FETCH_ARTICLE_SLUG_SUCCESS:
      return {
        ...state,
        loading: false,
        article: { ...action.payload },
      }
    case FETCH_ARTICLE_SLUG_FAILURE:
      return { ...state, loading: false, error: action.payload }
    /* ARTICLE PAGE SLUG EDIT */
    case FETCH_ARTICLE_SLUG_EDIT_REQUEST:
      return { ...state, loading: true, error: null }
    case FETCH_ARTICLE_SLUG_EDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        article: { ...action.payload },
        flag: true,
      }
    case FETCH_ARTICLE_SLUG_EDIT_FAILURE:
      return { ...state, loading: false, error: action.payload }
    /* CREATE NEW ARTICLE */
    case POST_ARTICLE:
      return { ...state, loading: true, error: null }
    case POST_ARTICLE_SUCCESS:
      return { ...state, loading: false, error: null, statusCreate: true }
    case POST_ARTICLE_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case POST_ARTICLE_SERVER_FAIL:
      return { ...state, loading: false, server: action.payload }
    /* DELETE ARTICLE */
    case DELETE_ARTICLE:
      return { ...state, loading: true, error: null }
    case DELETE_ARTICLE_SUCCESS:
      return { ...state, loading: false, error: null, statusDelete: true }
    case DELETE_ARTICLE_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case DELETE_ARTICLE_SERVER_FAIL:
      return { ...state, loading: false, server: action.payload }
    /* EDIT ARTICLE */
    case PUT_EDIT_ARTICLE:
      return { ...state, loading: true, error: null }
    case PUT_EDIT_ARTICLE_SUCCES:
      console.log('y must')
      return { ...state, loading: false, error: null, statusEdit: true }
    case PUT_EDIT_ARTICLE_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case PUT_EDIT_ARTICLE_SERVER_FAIL:
      return { ...state, loading: false, server: action.payload }
    /* LIKE/UNLIKE ARTICLE */
    case POST_FAVORITE_ARTICLE:
      return {
        ...state,
        articles: state.articles.map((el) => {
          if (el.slug === action.payload.slug)
            return {
              ...el,
              favorited: true,
              favoritesCount: action.payload.favoritesCount,
            }
          return el
        }),
        article: action.payload,
      }
    case DELETE_FAVORITE_ARTICLE:
      return {
        ...state,
        articles: state.articles.map((el) => {
          if (el.slug === action.payload.slug)
            return {
              ...el,
              favorited: false,
              favoritesCount: action.payload.favoritesCount,
            }
          return el
        }),
        article: action.payload,
      }

    default:
      return state
  }
}

export default reducerArticles
