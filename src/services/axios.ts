import axios from 'axios'

export default axios.create(
  {
    baseURL: 'https://quiniela-api.onrender.com'
  }
)