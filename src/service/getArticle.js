const getArticle = async (slug) => {
  const url = `https://blog.kata.academy/api/articles/${slug}`
  // const token = localStorage.getItem('token')
  // const response = await fetch(url)
  // console.log('tok', token)
  const response = await fetch(
    url,
    // method: 'GET',
    // headers: {
    //   'Content-Type': 'application/json',
    //   Authorization: `Token ${token}`,
    // },
  )
  if (!response.ok) throw new Error(`Status code: ${response.status}`)
  const res = await response.json()
  return res
}

export default getArticle
