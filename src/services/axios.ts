import axios from 'axios'

export default axios.create(
  {
    baseURL: 'https://quiniela-api-production.up.railway.app'
  }
)