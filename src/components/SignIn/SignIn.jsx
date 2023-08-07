import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../redux/actions/actionCreators'
import AlertError from '../AlertError/AlertError'
import Spinner from '../SpinnerLoad/SpinnerLoad'
import styles from './SignIn.module.scss'

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onSubmit',
  })
  const reducerUser = useSelector((state) => state.reducerUser)
  const { loading, error, server, isLogin } = reducerUser

  const dispatch = useDispatch()
  const history = useHistory()

  const onSubmit = (dataUser) => {
    const { email, password } = dataUser
    const user = {
      user: {
        email: email,
        password: password,
      },
    }
    dispatch(loginUser(user))
  }

  useEffect(() => {
    if (isLogin) {
      history.push('/articles')
      reset()
    }
  }, [isLogin])

  return (
    <>
      {error ? <AlertError message={error} /> : null}
      {loading && !error ? <Spinner /> : null}
      <div className={styles.sign_in}>
        <h1 className={styles.sign_in__title}>Sign In</h1>
        <form
          className={styles.sign_in__forms}
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className={styles.sign_in__label} htmlFor="email">
            Email address
          </label>
          <input
            className={`${styles.sign_in__input_email} ${
              errors.email || server.errors.errors
                ? styles.sign_in__input_error
                : ''
            }`}
            placeholder="Email address"
            type="email"
            id="email"
            autoComplete="off"
            {...register('email', {
              required: 'Заполните поле',
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
              <p className={styles.sign_in__text_error}>{message}</p>
            )}
          />
          {server.errors.errors ? (
            <p className={styles.sign_in__text_error}>
              email or password is invalid
            </p>
          ) : null}
          <label className={styles.sign_in__label} htmlFor="password">
            Password
          </label>
          <input
            className={`${styles.sign_in__input_password} ${
              errors.password || server.errors.errors
                ? styles.sign_in__input_error
                : ''
            }`}
            placeholder="Password"
            type="password"
            id="password"
            autoComplete="off"
            {...register('password', {
              required: 'Заполните поле',
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
              <p className={styles.sign_in__text_error}>{message}</p>
            )}
          />
          {server.errors.errors ? (
            <p className={styles.sign_in__text_error}>
              email or password is invalid
            </p>
          ) : null}
          <button
            className={styles.sign_in__button_send_form}
            type="submit"
            value="Login"
          >
            Login
          </button>
          <p className={styles.sign_in__account_question}>
            Don’t have an account?{' '}
            <Link to="/sign-up" className={styles.sing_in__link_sign_up}>
              Sign Up
            </Link>
            .
          </p>
        </form>
      </div>
    </>
  )
}

export default SignIn
