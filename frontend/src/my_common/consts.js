export default {

  API_URL: process.env.NODE_ENV === 'development' ? 'http://rptmdhcwgk.us12.qoddiapp.com/api' : 'https://dstv-backend.herokuapp.com/api',
  OAPI_URL: process.env.NODE_ENV === 'development'? 'http://rptmdhcwgk.us12.qoddiapp.com/oapi' : 'https://dstv-backend.herokuapp.com/oapi'

  //http://localhost:3003/oapi

}
