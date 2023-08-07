import instanceAxios from './instanceAxios'

const postFavoriteArticle = async (slug) => {
  const res = await instanceAxios.post(`articles/${slug}/favorite`)
  return res
}

export default postFavoriteArticle
