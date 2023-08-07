import axios from 'axios'

const instanceAxios = axios.create({
  baseURL: 'https://blog.kata.academy/api',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Token ${localStorage.getItem('token')}`,
  },
})

export default instanceAxios
