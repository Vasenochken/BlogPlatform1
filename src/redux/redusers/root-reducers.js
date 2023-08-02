import { combineReducers } from 'redux'
import reducerArticles from './reducer-articles'
import reducerUser from './reducer-user'
// import reducerLogin from './reducer-login'
// import reducerUpDateUser from './reducer-update-user'

const rootReducer = combineReducers({
  reducerArticles,
  reducerUser,
  // reducerLogin,
  // reducerUpDateUser,
})

export default rootReducer
