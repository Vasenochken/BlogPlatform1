import instanceAxios from './instanceAxios'

const postCreateArticle = async (dataArticle) => {
  const res = await instanceAxios.post('articles', dataArticle)
  return res
}

export default postCreateArticle
