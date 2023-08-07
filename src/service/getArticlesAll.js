import instanceAxios from './instanceAxios'

const getArticlesAll = async (offset) => {
  const n = 5
  if (offset === 1) offset = 0
  else offset = offset * n - n
  const res = await instanceAxios.get('articles', {
    params: {
      limit: 5,
      offset,
    },
  })
  return res
}

export default getArticlesAll
