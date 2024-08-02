import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async() => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const like = async (id, blogObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${id}`, blogObject, config)
  return response.data
}

const remove = async id => {
  const config = {
    headers: { Authorization: token },
  }
  const response = axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { setToken, getAll, create, like, remove }