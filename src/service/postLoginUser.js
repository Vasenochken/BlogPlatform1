const postLoginUser = async (dataUser) => {
  const url = 'https://blog.kata.academy/api/users/login' // вход зарегистрированного пользователя
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataUser),
  })
  if (!response.ok) {
    if (response.status === 422) {
      const error = await response.json()
      const serverError = { ...error, message: '422' }
      throw serverError
    }
    throw new Error(`Status code:${response.status}`)
  }
  const res = await response.json()
  const token = res.user.token
  if (token !== localStorage.getItem('token'))
    localStorage.setItem('token', token)
  return res
}

export default postLoginUser
