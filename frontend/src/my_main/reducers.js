import { combineReducers } from 'redux'
import DashboardReducer from '../my_pages/dashboard/dashboardReducer'
import ClienteRedux from '../my_pages/cliente/clienteRedux'
import { reducer as formReducer } from 'redux-form'
import { reducer as toastrReducer } from 'react-redux-toastr'
import AuthReducer from '../my_pages/auth/authReducer'

const rootReducer = combineReducers({
  dashboard: DashboardReducer,
  cliente: ClienteRedux,
  form: formReducer,
  toastr: toastrReducer,
  auth: AuthReducer
})

export default rootReducer
