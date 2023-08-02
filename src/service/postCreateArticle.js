const postCreateArticle = async (dataArticle) => {
  const url = 'https://blog.kata.academy/api/articles'
  const token = localStorage.getItem('token')
  const article = dataArticle
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(article),
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
  return res
}

export default postCreateArticle
