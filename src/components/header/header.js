import React, { useEffect } from 'react'
import defaultAvatar from '../../img/defaultAvatar.svg'
import styles from './header.module.scss'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useDispatch, useSelector } from 'react-redux'
import { logOut, curUser } from '../../redux/actions/action-creators'
// import { getCurrentUser } from '../../service/service'

const Header = () => {
  const history = useHistory()
  const isLogin = useSelector((state) => state.reducerUser.isLogin)
  const currentUsername = useSelector(
    (state) => state.reducerUser.user.username,
  )
  const currentImage = useSelector((state) => state.reducerUser.user.image)
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (token) {
      dispatch(curUser(token))
    }
  }, [dispatch, history, isLogin, currentUsername, currentImage])

  return (
    <header className={styles.header}>
      <Link className={styles.header__title} to="/articles">
        Realworld Blog
      </Link>
      {!isLogin ? (
        <div className={styles.header__box_un_login}>
          <Link to="/sign-in" className={styles.header__link_sign_in}>
            Sign In
          </Link>
          <Link to="/sign-up" className={styles.header__link_sign_up}>
            Sign Up
          </Link>
        </div>
      ) : (
        <div className={styles.header__box_on_login}>
          <Link to="/new-article" className={styles.header__button_create}>
            Create article
          </Link>
          <div className={styles.header__box_profile}>
            <Link to="/profile">{currentUsername}</Link>
            <img
              className={styles.header__profile_avatar}
              src={!currentImage ? defaultAvatar : currentImage}
              alt="avatar"
            />
          </div>
          <button
            onClick={() => {
              dispatch(logOut())
              history.push('/articles')
            }}
            className={styles.header__button_logout}
          >
            Log out
          </button>
        </div>
      )}
    </header>
  )
}

export default Header
