export default {

  API_URL: process.env.NODE_ENV === 'development' ? 'http://localhost:3003/api' : 'https://dstv-backend.herokuapp.com/api',
  OAPI_URL: process.env.NODE_ENV === 'development'? 'http://localhost:3003/oapi' : 'https://dstv-backend.herokuapp.com/oapi'
}
