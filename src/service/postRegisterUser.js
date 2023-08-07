import instanceAxios from './instanceAxios'

const postRegisterUser = async (dataUser) => {
  const res = await instanceAxios.post('users', dataUser)
  return res
}

export default postRegisterUser
