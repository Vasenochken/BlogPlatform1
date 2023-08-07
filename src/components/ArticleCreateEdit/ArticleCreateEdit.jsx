import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  useHistory,
  useParams,
} from 'react-router-dom/cjs/react-router-dom.min'
import { useForm, useFieldArray } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import {
  createArticle,
  getAnArticleEdit,
  upDateArticle,
} from '../../redux/actions/actionCreators'
import AlertError from '../AlertError/AlertError'
import Spinner from '../SpinnerLoad/SpinnerLoad'
import styles from './ArticleCreateEdit.module.scss'

const ArticleCreateEdit = () => {
  const loading = useSelector((state) => state.reducerArticles.loading)
  const error = useSelector((state) => state.reducerArticles.error)
  const article = useSelector((state) => state.reducerArticles.article)
  const statusCreate = useSelector(
    (state) => state.reducerArticles.statusCreate,
  )
  const statusEdit = useSelector((state) => state.reducerArticles.statusEdit)
  const { title, description, body, tagList } = article

  const history = useHistory()
  const path = history.location.pathname
  const { slug } = useParams()
  const dispatch = useDispatch()
  const {
    register,
    resetField,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    reset,
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      title: '',
      description: '',
      body: '',
      tag: '',
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  })

  const onSubmit = (dataArticle) => {
    const { title, description, body, tagList } = dataArticle
    const formatTagList = tagList.map((el) => el.tag)
    const article = {
      article: {
        title: title,
        description: description,
        body: body,
        tagList: formatTagList,
      },
    }
    if (path === '/new-article') dispatch(createArticle(article))
    else {
      dispatch(upDateArticle(article, slug))
    }
  }
  useEffect(() => {
    if (path === '/new-article') {
      if (path === '/new-article' && statusCreate) {
        history.push('/articles')
      }
      reset()
      remove(0)
    }
    if (path !== '/new-article') {
      if (path !== '/new-article' && statusEdit) history.push('/articles')
      dispatch(getAnArticleEdit(slug))
      setValue('title', title)
      setValue('description', description)
      setValue('body', body)
      remove(0)
      tagList.forEach((tag) => {
        append({ tag })
      })
    }
  }, [path, history, title, statusCreate, statusEdit])

  return (
    <>
      {error ? <AlertError message={error} /> : null}
      {loading && !error ? <Spinner /> : null}
      <div className={styles.article}>
        {path !== '/new-article' ? (
          <h1 className={styles.article__title}>Edit article</h1>
        ) : null}
        {path === '/new-article' ? (
          <h1 className={styles.article__title}>Create new article</h1>
        ) : null}
        <form
          className={styles.article__forms}
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className={styles.article__label} htmlFor="title">
            Title
          </label>
          <input
            className={`${styles.article__input_title} ${
              errors.title ? styles.article__input_error : ''
            }`}
            placeholder="Title"
            id="title"
            autoComplete="off"
            {...register('title', {
              required: 'Поле обязательно для заполнения',
            })}
          />
          <ErrorMessage
            errors={errors}
            name="title"
            render={({ message }) => {
              return <p className={styles.article__text_error}>{message}</p>
            }}
          />
          <label className={styles.article__label} htmlFor="description">
            Short description
          </label>
          <input
            className={`${styles.article__input_description} ${
              errors.description ? styles.article__input_error : ''
            }`}
            placeholder="Title"
            type="text"
            id="description"
            autoComplete="off"
            {...register('description', {
              required: 'Поле обязательно для заполнения',
            })}
          />
          <ErrorMessage
            errors={errors}
            name="description"
            render={({ message }) => (
              <p className={styles.article__text_error}>{message}</p>
            )}
          />
          <label className={styles.article__label} htmlFor="body">
            Text
          </label>
          <input
            className={`${styles.article__input_body} ${
              errors.body ? styles.article__input_error : ''
            }`}
            placeholder="Text"
            type="textarea"
            id="body"
            autoComplete="off"
            {...register('body', {
              required: 'Поле обязательно для заполнения',
            })}
          />
          <ErrorMessage
            errors={errors}
            name="body"
            render={({ message }) => (
              <p className={styles.article__text_error}>{message}</p>
            )}
          />

          <ul className={styles.article__list_tags}>
            <label className={styles.article__label} htmlFor="newTag">
              Tags
            </label>
            {fields.map((item, index) => {
              return (
                <li className={styles.article__list_tags_item} key={item.id}>
                  <input
                    className={styles.article__input_tag}
                    defaultValue={item.tag}
                    {...register(`tagList.${index}.tag`, { required: true })}
                  />
                  <button
                    className={styles.article__button_del}
                    type="button"
                    onClick={() => remove(index)}
                  >
                    Delete
                  </button>
                </li>
              )
            })}
          </ul>
          <div className={styles.article__list_tags_item}>
            <input
              className={styles.article__input_tag}
              placeholder="Tag"
              {...register('newTag')}
            />
            <button
              className={styles.article__button_del}
              type="button"
              disabled={true}
            >
              Delete
            </button>
            <button
              className={styles.article__button_add}
              type="button"
              onClick={() => {
                const newTagValue = getValues('newTag')
                if (newTagValue.trim() !== '') {
                  append({ tag: newTagValue })
                }
                resetField('newTag')
              }}
            >
              Add tag
            </button>
          </div>
          <button className={styles.article__button_send_form} type="submit">
            Send
          </button>
        </form>
      </div>
    </>
  )
}

export default ArticleCreateEdit
