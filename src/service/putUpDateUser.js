import instanceAxios from './instanceAxios'

const updateUser = async (dataUser) => {
  const res = await instanceAxios.put('user', dataUser)
  return res
}

export default updateUser
