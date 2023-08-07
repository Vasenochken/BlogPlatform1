import instanceAxios from './instanceAxios'

const postLoginUser = async (dataUser) => {
  const res = await instanceAxios.post('users/login', dataUser)
  return res
}

export default postLoginUser
