const postRegisterUser = async (dataUser) => {
  const url = 'https://blog.kata.academy/api/users'
  try {
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
    }
    const res = await response.json()
    return res
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      return
    }
    throw error
  }
}

export default postRegisterUser
