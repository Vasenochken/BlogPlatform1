import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import {
  getAnArticle,
  upDateArticle,
} from '../../redux/actions/action-creators'
import AlertError from '../alert-error/alert-error'
import Spinner from '../spin-load/spin-load'
import styles from './article-edit.module.scss'

const EditArticle = () => {
  const loading = useSelector((state) => state.reducerArticles.loading)
  const error = useSelector((state) => state.reducerArticles.error)
  const article = useSelector((state) => state.reducerArticles.article)
  const tagList = useSelector((state) => state.reducerArticles.article.tagList)
  const { title, description, body } = article
  const { slug } = useParams()
  const dispatch = useDispatch()
  const [tags, setTags] = useState([...tagList])

  const tagAdd = () => {
    setTags([...tags, ''])
  }

  const tagDel = (index) => {
    const list = [...tags]
    list.splice(index, 1)
    setTags(list)
  }

  const handleChange = (e, index) => {
    const { value } = e.target
    const list = [...tags]
    list[index] = value
    setTags(list)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
  })

  const onSubmit = (dataArticle) => {
    const article = {
      article: {
        title: dataArticle.title,
        description: dataArticle.description,
        body: dataArticle.body,
        tagList: tags.filter((tag) => tag),
      },
    }
    dispatch(upDateArticle(article, slug))
  }

  useEffect(() => {
    dispatch(getAnArticle(slug))
  }, [])

  return (
    <>
      {error ? <AlertError message={error} /> : null}
      {loading && !error ? <Spinner /> : null}
      <div className={styles.article}>
        <h1 className={styles.article__title}>Edit article</h1>

        <form
          className={styles.article__forms}
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className={styles.article__label} htmlFor="title">
            Title
          </label>
          <input
            className={`${styles.article__username}`}
            // ${
            // errors.username || server.errors.username
            //  ? styles.sign_up__username_error
            //  : ''
            // }`}
            defaultValue={title}
            placeholder="Title"
            id="title"
            autoComplete="off"
            {...register('title', {
              required: 'Поле обязательно для заполнения',
              // minLength: {
              //   value: 3,
              //   message: 'Поле должно содержать минимум 3 символа',
              // },
              // maxLength: {
              //   value: 20,
              //   message: 'Поле должно содержать не больше 20 символов',
              // },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="title"
            render={({ message }) => {
              return <p className={styles.article__text_error}>{message}</p>
            }}
          />
          {/* {server.errors.username ? (
          <p className={styles.sign_up__text_error}>
            {server.errors.username}
          </p>
        ) : null} */}

          <label className={styles.article__label} htmlFor="description">
            Short description
          </label>
          <input
            className={`${styles.article__username}`}
            // ${
            //  errors.email || server.errors.email
            //    ? styles.sign_up__username_error
            //    : ''
            //}`}
            defaultValue={description}
            placeholder="Title"
            type="text"
            id="description"
            autoComplete="off"
            {...register('description', {
              required: 'Поле обязательно для заполнения',
              // pattern: {
              //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              //   message: 'Некорректный адрес элктронной почты',
              // },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="description"
            render={({ message }) => (
              <p className={styles.article__text_error}>{message}</p>
            )}
          />
          {/* {server.errors.email ? (
          <p className={styles.sign_up__text_error}>{server.errors.email}</p>
        ) : null} */}
          <label className={styles.article__label} htmlFor="body">
            Text
          </label>
          <input
            className={`${styles.article__username_text}`}
            //${
            //  errors.password ? styles.sign_up__username_error : ''
            //}`}
            placeholder="Text"
            type="text"
            id="body"
            defaultValue={body}
            autoComplete="off"
            {...register('body', {
              required: 'Поле обязательно для заполнения',
              // minLength: {
              //   value: 6,
              //   message: 'Поле должно содержать минимум 6 символов',
              // },
              // maxLength: {
              //   value: 40,
              //   message: 'Поле должно содержать не больше 40 символов',
              // },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="text"
            render={({ message }) => (
              <p className={styles.article__text_error}>{message}</p>
            )}
          />

          <div className={styles.article__tag_box}>
            <p className={styles.article__tag_title}>Tags</p>
            <div className={styles.article__tag_list}>
              {tags.map((tagValue, index) => (
                <div className={styles.article__tag_wrapper} key={index}>
                  <input
                    name="tags"
                    id="Tag"
                    type="text"
                    defaultValue={tagValue}
                    className={styles.article__username_tag}
                    placeholder="Tag"
                    onChange={(e) => handleChange(e, index)}
                  />
                  {tags.length > 1 && (
                    <button
                      onClick={() => tagDel(index)}
                      className={styles.article__button_del}
                    >
                      Delete
                    </button>
                  )}

                  {tags.length - 1 === index && tags.length < 4 && (
                    <button
                      onClick={tagAdd}
                      className={styles.article__button_add}
                    >
                      Add tag
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          <button
            className={styles.article__button_send_form}
            type="submit"
            value="Send"
          >
            Send
          </button>
        </form>
      </div>
    </>
  )
}

export default EditArticle
