import axios from 'axios'

export default axios.create(
  {
    baseURL: 'https://quiniela-api-production.up.railway.app'
  }
)

//  http://192.168.100.70:4000 https://quiniela-api-production.up.railway.app