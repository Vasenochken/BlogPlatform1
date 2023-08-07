import { combineReducers } from 'redux'
import reducerArticles from './reducerArticles'
import reducerUser from './reducerUser'

const rootReducer = combineReducers({
  reducerArticles,
  reducerUser,
})

export default rootReducer
