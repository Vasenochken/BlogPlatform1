import instanceAxios from './instanceAxios'

const putUpDateArticle = async (dataArticle, slug) => {
  const res = await instanceAxios.put(`articles/${slug}`, dataArticle)
  return res
}

export default putUpDateArticle
