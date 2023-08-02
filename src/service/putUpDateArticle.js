const putUpDateArticle = async (dataArticle, slug) => {
  const url = `https://blog.kata.academy/api/articles/${slug}`
  console.log('SLUG', slug)
  const article = dataArticle
  const token = localStorage.getItem('token')
  const response = await fetch(url, {
    method: 'PUT',
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

export default putUpDateArticle
