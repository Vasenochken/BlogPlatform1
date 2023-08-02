import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../redux/actions/action-creators'
import AlertError from '../alert-error/alert-error'
import Spinner from '../spin-load/spin-load'
import styles from './sign-in.module.scss'

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'all',
  })
  const reducerUser = useSelector((state) => state.reducerUser)
  const { loading, error, server, isLogin } = reducerUser

  const dispatch = useDispatch()
  const history = useHistory()

  const onSubmit = (dataUser) => {
    console.log('', dataUser)
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
      alert('Вход успешный')
      // dispatch(selectTabDefault())
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
            className={`${styles.sign_in__username} ${
              errors.email || server.errors.errors
                ? styles.sign_in__username_error
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
            className={`${styles.sign_in__username} ${
              errors.password || server.errors.errors
                ? styles.sign_in__username_error
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
            <Link to="/sign-up">
              <button
                className={styles.sing_in__ref_sign_in}
                // onClick={() => dispatch(selectTabSignUp())}
              >
                Sign Up
              </button>
            </Link>
            .
          </p>
        </form>
      </div>
    </>
  )
}

export default SignIn
