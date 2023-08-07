import instanceAxios from './instanceAxios'

const getArticle = async (slug) => {
  const res = await instanceAxios.get(`articles/${slug}`)
  return res
}

export default getArticle
