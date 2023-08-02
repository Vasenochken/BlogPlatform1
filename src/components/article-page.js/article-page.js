import React, {
  useEffect,
  //  , useState
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import {
  //  Modal,
  message,
  Popconfirm,
  //  Button,
  //  Avatar
} from 'antd'
import {
  delArticle,
  //delArticle,
  getAnArticle,
  likeArticle,
  unlikeArticle,
} from '../../redux/actions/action-creators'
import {
  Link,
  useHistory,
  useParams,
} from 'react-router-dom/cjs/react-router-dom.min'
import { generateId, formatDate } from '../../utilities/utilities'
import Spinner from '../spin-load/spin-load'
import AlertError from '../alert-error/alert-error'
import styles from './article-page.module.scss'

const ArticlePage = () => {
  const isLogin = useSelector((state) => state.reducerUser.isLogin)
  const user = useSelector((state) => state.reducerUser.user.username)
  const article = useSelector((state) => state.reducerArticles.article)
  const loading = useSelector((state) => state.reducerArticles.loading)
  const error = useSelector((state) => state.reducerArticles.error)

  const { slug } = useParams()

  const dispatch = useDispatch()
  const history = useHistory()
  const {
    author,
    title,
    favorited,
    favoritesCount,
    tagList,
    description,
    createdAt,
    body,
  } = article
  const { username, image } = author
  const markdown = body

  const handleLike = () => {
    !favorited ? dispatch(likeArticle(slug)) : dispatch(unlikeArticle(slug))
  }

  const confirm = () => {
    message.success('Пост удален')
    dispatch(delArticle(slug))
    history.push('/articles')
  }
  const cancel = () => {
    message.error('Отмена удаления поста')
  }

  useEffect(() => {
    dispatch(getAnArticle(slug))
  }, [dispatch, isLogin])

  return (
    <>
      {error ? <AlertError message={error} /> : null}
      {loading && !error ? <Spinner /> : null}
      <li className={styles.list__item}>
        <div className={styles.box}>
          <div className={styles.article__article_info}>
            <div className={styles.box_title}>
              <h5 className={styles.article__title}>{title}</h5>
              {/* <label className={styles.label_button}>
                <input className={styles.button_like} type="button"></input>
                <p className={styles.counter}>{favoritesCount}</p>
              </label> */}
              <label className={styles.li_item__label_button}>
                <button
                  className={
                    // styles.li_item__button_like
                    favorited
                      ? styles.li_item__button_like_active
                      : styles.li_item__button_like
                  }
                  disabled={!isLogin ? true : false}
                  onClick={() => {
                    handleLike()
                  }}
                ></button>
                <p className={styles.li_item__counter_like}>{favoritesCount}</p>
              </label>
            </div>

            <div className={styles.boxs_tags}>
              {tagList.map((el) => {
                return (
                  <p className={styles.tag} key={generateId()}>
                    {el}
                  </p>
                )
              })}{' '}
            </div>

            <span className={styles.article__text}>
              <p className={styles.article__text_p}>{description}</p>
            </span>
          </div>

          <div className={styles.article__author_info}>
            <div className={styles.info}>
              <span className={styles.box_text}>
                <p className={styles.article__author_name}>{username}</p>
                <p className={styles.article__date}>{formatDate(createdAt)}</p>
              </span>
              <img
                className={styles.article__author_avatar}
                src={image}
                alt="user avatar"
              />
            </div>
            {username === user ? (
              <div className={styles.box_buttons}>
                <Popconfirm
                  placement="rightTop"
                  description="Are you sure to delete this article?"
                  onConfirm={confirm}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <button className={styles.button_del} type="submit">
                    Delete
                  </button>
                </Popconfirm>
                <Link
                  to={`/articles/${slug}/edit`}
                  className={styles.button_edit}
                >
                  Edit
                </Link>
              </div>
            ) : null}
          </div>
        </div>

        <div className={styles.markdown}>
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </li>
    </>
  )
}

export default ArticlePage
