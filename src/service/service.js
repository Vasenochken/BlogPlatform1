export const getArticlesAll = async (page) => {
  const n = 5
  if (page === 1) page = 0
  else page = page * n - n
  const url = `https://blog.kata.academy/api/articles?offset=${page}&limit=5`
  const token = localStorage.getItem('token')
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  })
  if (!response.ok) throw new Error(`Status code: ${response.status}`)
  const res = await response.json()
  return res
}

export const getCurrentUser = async (token) => {
  const url = 'https://blog.kata.academy/api/user'
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  })
  if (!response.ok) throw new Error(`Status code: ${response.status}`)
  const res = await response.json()
  return res
}
