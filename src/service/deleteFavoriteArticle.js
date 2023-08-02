const unfavoriteArticle = async (slug) => {
  const url = `https://blog.kata.academy/api/articles/${slug}/favorite`
  const token = localStorage.getItem('token')
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  })
  if (!response.ok) {
    if (response.status === 422) {
      const error = await response.json()
      console.log('Eror: ', error)
      const serverError = { ...error, message: '422' }
      throw serverError
    }
    throw new Error(`Status code:${response.status}`)
  }
  const res = await response.json()
  return res
}

export default unfavoriteArticle
