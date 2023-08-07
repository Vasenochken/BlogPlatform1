import instanceAxios from './instanceAxios'

const unfavoriteArticle = async (slug) => {
  const res = await instanceAxios.delete(`articles/${slug}/favorite`)
  return res
}

export default unfavoriteArticle
