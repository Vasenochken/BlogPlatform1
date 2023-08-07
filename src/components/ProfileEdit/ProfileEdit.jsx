import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { userUpdate } from '../../redux/actions/actionCreators'
import AlertError from '../AlertError/AlertError'
import Spinner from '../SpinnerLoad/SpinnerLoad'
import styles from './ProfileEdit.module.scss'

const editProfile = () => {
  const reducerUser = useSelector((state) => state.reducerUser)
  const { user, loading, error, server } = reducerUser
  const { username, email, image } = user

  // const history = useHistory()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      username: username,
      email: email,
      image: image,
    },
  })

  const onSubmit = (dataUser) => {
    const { username, email, password, image } = dataUser
    const user = {
      user: {
        username: username,
        email: email,
        password: password,
        image: image,
      },
    }
    dispatch(userUpdate(user))
  }

  useEffect(() => {}, [loading, error])

  return (
    <>
      {error ? <AlertError message={error} /> : null}
      {loading && !error ? <Spinner /> : null}
      <div className={styles.profile_edit}>
        <h1 className={styles.profile_edit__title}>Edit Profile</h1>
        <form
          className={styles.profile_edit__forms}
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className={styles.profile_edit__label} htmlFor="username">
            Username
          </label>
          <input
            className={`${styles.profile_edit__input_username}
            ${
              errors.username || server.errors.username
                ? styles.profile_edit__input_error
                : ''
            }`}
            placeholder="Username"
            id="username"
            autoComplete="off"
            {...register('username', {
              required: 'Поле обязательно для заполнения',
              pattern: {
                value: /^[a-zA-Z0-9]*$/,
                message: 'Недопустимые символы',
              },
              minLength: {
                value: 3,
                message: 'Поле должно содержать минимум 3 символа',
              },
              maxLength: {
                value: 20,
                message: 'Поле должно содержать не больше 20 символов',
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="username"
            render={({ message }) => {
              return (
                <p className={styles.profile_edit__text_error}>{message}</p>
              )
            }}
          />
          {server.errors.username ? (
            <p className={styles.profile_edit__text_error}>
              {server.errors.username}
            </p>
          ) : null}

          <label className={styles.profile_edit__label} htmlFor="email">
            Email address
          </label>
          <input
            className={`${styles.profile_edit__input_email}
            ${
              errors.email || server.errors.email
                ? styles.profile_edit__input_error
                : ''
            }`}
            placeholder="Email address"
            type="email"
            id="email"
            autoComplete="off"
            {...register('email', {
              required: 'Поле обязательно для заполнения',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Некорректный адрес элктронной почты',
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => (
              <p className={styles.profile_edit__text_error}>{message}</p>
            )}
          />
          {server.errors.email ? (
            <p className={styles.profile_edit__text_error}>
              {server.errors.email}
            </p>
          ) : null}
          <label className={styles.profile_edit__label} htmlFor="password">
            Password
          </label>
          <input
            className={`${styles.profile_edit__input_password}
            ${errors.password ? styles.profile_edit__input_error : ''}`}
            placeholder="New password"
            type="password"
            id="password"
            autoComplete="off"
            {...register('password', {
              required: 'Поле обязательно для заполнения',
              minLength: {
                value: 6,
                message: 'Поле должно содержать минимум 6 символов',
              },
              maxLength: {
                value: 40,
                message: 'Поле должно содержать не больше 40 символов',
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => (
              <p className={styles.profile_edit__text_error}>{message}</p>
            )}
          />
          <label className={styles.profile_edit__label} htmlFor="image">
            Avatar image {'(url)'}
          </label>
          <input
            className={`${styles.profile_edit__input_image}
            ${
              errors.image || server.errors.email
                ? styles.profile_edit__input_error
                : ''
            }`}
            placeholder="Avatar image"
            type="text"
            id="image"
            autoComplete="off"
            {...register('image', {
              pattern: {
                value: /^(ftp|http|https):\/\/[^ "]+$/,
                message: 'Некорректный URL',
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="image"
            render={({ message }) => (
              <p className={styles.profile_edit__text_error}>{message}</p>
            )}
          />
          <button
            className={styles.profile_edit__button_send_form}
            type="submit"
            value="Create"
          >
            Save
          </button>
        </form>
      </div>
    </>
  )
}

export default editProfile
