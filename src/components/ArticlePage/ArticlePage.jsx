import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { message, Popconfirm } from 'antd'
import {
  delArticle,
  getAnArticle,
  likeArticle,
  unlikeArticle,
} from '../../redux/actions/actionCreators'
import {
  Link,
  useHistory,
  useParams,
} from 'react-router-dom/cjs/react-router-dom.min'
import { generateId, formatDate } from '../../utilities/utilities'
import Spinner from '../SpinnerLoad/SpinnerLoad'
import AlertError from '../AlertError/AlertError'
import styles from './ArticlePage.module.scss'

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
      <section className={styles.article}>
        <div className={styles.article__info_li_item}>
          <div className={styles.article__info}>
            <div className={styles.article__box_title}>
              <h5 className={styles.article__title}>{title}</h5>
              <label className={styles.article__label_favorited}>
                <button
                  className={
                    favorited
                      ? styles.article__button_like_active
                      : styles.article__button_like
                  }
                  disabled={!isLogin ? true : false}
                  onClick={() => {
                    handleLike()
                  }}
                ></button>
                <p className={styles.article__counter_like}>{favoritesCount}</p>
              </label>
            </div>

            <div className={styles.article__box_tags}>
              {tagList.map((el) => {
                return (
                  <p className={styles.article__tag} key={generateId()}>
                    {el}
                  </p>
                )
              })}{' '}
            </div>

            <span className={styles.article__description}>{description}</span>
          </div>

          <div className={styles.article__info_author}>
            <div className={styles.article__info_author_box}>
              <span className={styles.article__box_name_date}>
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
              <div className={styles.article__box_buttons}>
                <Popconfirm
                  placement="rightTop"
                  description="Are you sure to delete this article?"
                  onConfirm={confirm}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <button className={styles.article__button_del} type="submit">
                    Delete
                  </button>
                </Popconfirm>
                <Link
                  to={`/articles/${slug}/edit`}
                  className={styles.article__button_edit}
                >
                  Edit
                </Link>
              </div>
            ) : null}
          </div>
        </div>

        <div className={styles.article__info_markdown}>
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </section>
    </>
  )
}

export default ArticlePage
