import axios from 'axios'

export default axios.create(
  {
    baseURL: 'https://quiniela-api.fly.dev'
  }
)
