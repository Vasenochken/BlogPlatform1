import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { Checkbox } from 'antd'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { registerUser } from '../../redux/actions/actionCreators'
import AlertError from '../AlertError/AlertError'
import Spinner from '../SpinnerLoad/SpinnerLoad'
import styles from './SignUp.module.scss'

const SignUp = () => {
  const reducerUser = useSelector((state) => state.reducerUser)
  const { loading, error, user, server } = reducerUser
  const { token } = user
  const dispatch = useDispatch()
  const history = useHistory()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    mode: 'onSubmit',
  })

  const password = watch('password', '')
  const onSubmit = (dataUser) => {
    const { username, email, password } = dataUser
    const user = {
      user: {
        username: username,
        email: email,
        password: password,
      },
    }
    dispatch(registerUser(user))
  }

  useEffect(() => {
    if (token) {
      history.push('/sign-in')
      reset()
    }
  }, [token, server, reset])
  return (
    <>
      {error ? <AlertError message={error} /> : null}
      {loading && !error ? <Spinner /> : null}
      <div className={styles.sign_up}>
        <h1 className={styles.sign_up__title}>Create new account</h1>
        <form
          className={styles.sign_up__forms}
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className={styles.sign_up__label} htmlFor="username">
            Username
          </label>
          <input
            className={`${styles.sign_up__input_username} ${
              errors.username || server.errors.username
                ? styles.sign_up__input_error
                : ''
            }`}
            placeholder="Username"
            id="username"
            autoComplete="off"
            {...register('username', {
              required: 'Поле обязательно для заполнения',
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
              return <p className={styles.sign_up__text_error}>{message}</p>
            }}
          />
          {server.errors.username ? (
            <p className={styles.sign_up__text_error}>
              {server.errors.username}
            </p>
          ) : null}

          <label className={styles.sign_up__label} htmlFor="email">
            Email address
          </label>
          <input
            className={`${styles.sign_up__input_email} ${
              errors.email || server.errors.email
                ? styles.sign_up__input_error
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
              <p className={styles.sign_up__text_error}>{message}</p>
            )}
          />
          {server.errors.email ? (
            <p className={styles.sign_up__text_error}>{server.errors.email}</p>
          ) : null}
          <label className={styles.sign_up__label} htmlFor="password">
            Password
          </label>
          <input
            className={`${styles.sign_up__input_password} ${
              errors.password ? styles.sign_up__input_error : ''
            }`}
            placeholder="Password"
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
              <p className={styles.sign_up__text_error}>{message}</p>
            )}
          />
          <label className={styles.sign_up__label} htmlFor="repeat password">
            Repeat Password
          </label>
          <input
            className={`${styles.sign_up__input_password_repeat} ${
              errors['repeat password'] ? styles.sign_up__input_error : ''
            }`}
            placeholder="Password"
            type="password"
            id="repeat password"
            autoComplete="off"
            {...register('repeat password', {
              required: 'Поле обязательно для заполнения',
              validate: (value) =>
                value === password || 'Пароли должны совпадать',
            })}
          />
          <ErrorMessage
            errors={errors}
            name="repeat password"
            render={({ message }) => (
              <p className={styles.sign_up__text_error}>{message}</p>
            )}
          />
          <div className={styles.sign_up__box_agreement}>
            <Checkbox
              className={styles.sign_up__checkbox}
              {...register('checkbox', {
                checked: false,
                onChange: (e) => {
                  setValue('checkbox', e.target.checked)
                },
                validate: (value) => value || 'Подтвердите согласие',
              })}
            />
            <span className={styles.sign_up__box_agreement_text}>
              I agree to the processing of my personal information
            </span>
          </div>
          <ErrorMessage
            errors={errors}
            name="checkbox"
            render={({ message }) => (
              <p className={styles.sign_up__text_error}>{message}</p>
            )}
          />

          <button className={styles.sign_up__button_send_form} type="submit">
            Create
          </button>
        </form>
        <p className={styles.sign_up__account_question}>
          Already have an account?{' '}
          <Link to="/sign-in" className={styles.sing_in__link_sign_in}>
            Sign In
          </Link>
          .
        </p>
      </div>
    </>
  )
}

export default SignUp
