import React from 'react'
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom/cjs/react-router-dom.min'

import Header from '../header/header'
import ListArticles from '../list-articles/list-articles'
import ArticlePage from '../article-page.js/article-page'
import SignUp from '../sing-up/sign-up'
import SignIn from '../sign-in/sign-in'
import editProfile from '../edit-profile/edit-profile'
import CreateArticle from '../article-create/article-create'
import EditArticle from '../article-edit/article-edit'

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={ListArticles} />
        <Route exact path="/articles" component={ListArticles} />
        <Route exact path="/articles/:slug" component={ArticlePage} />
        <Route exact path="/new-article" component={CreateArticle} />
        <Route exact path="/articles/:slug/edit" component={EditArticle} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/profile" component={editProfile} />
        {/* <Route component={NotFound} /> */}
      </Switch>
    </Router>
  )
}

export default App
