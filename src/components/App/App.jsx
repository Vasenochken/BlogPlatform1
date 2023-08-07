import React from 'react'
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom/cjs/react-router-dom.min'
import Header from '../Header/Header'
import ListArticles from '../ListArticles/ListArticles'
import ArticlePage from '../ArticlePage/ArticlePage'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import editProfile from '../ProfileEdit/ProfileEdit'
import ArticleCreateEdit from '../ArticleCreateEdit/ArticleCreateEdit'

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={ListArticles} />
        <Route exact path="/articles" component={ListArticles} />
        <Route exact path="/articles/:slug" component={ArticlePage} />
        <Route exact path="/new-article" component={ArticleCreateEdit} />
        <Route
          exact
          path="/articles/:slug/edit"
          component={ArticleCreateEdit}
        />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/profile" component={editProfile} />
      </Switch>
    </Router>
  )
}

export default App
